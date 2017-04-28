<?php
require "./databaseSingleton.php";
if(!empty($_GET)){
    if(!empty($_GET["type"]) && $_GET["type"] == "quizzes"){
        $query = "SELECT * FROM quiz;";
        echo(json_encode(Database::getInstance()->query($query)));
    }
    if(!empty($_GET["quizId"])){
        $query = "SELECT 
                q.question_id,
                q.question,
                GROUP_CONCAT(CONCAT(a.answer_id, ':', a.answer) ORDER BY a.answer_id) AllAnswers
            FROM question as q
            join answers as a ON a.question_id = q.question_id
            WHERE q.quiz_id = :quizId
            group by q.question_id
        ";
        $tmpPdo = Database::getInstance()->getPdo();
        $stmt = $tmpPdo->prepare($query);
        $stmt->bindParam(":quizId", $_GET["quizId"], PDO::PARAM_INT);
        $stmt->execute();
        echo(json_encode(toHierarchicalQuiz($stmt->fetchAll())));
    }

}else if(!empty($_POST)){
    echo getMark(getAnswers());
}else{
    $res = array();
    $res["result"] = 0;
    echo json_encode($res);
}

/**
* @return array an associated array of questionId=>answerId pairs.
**/
function getAnswers(){
    $tmpPdo = Database::getInstance()->getPdo();
    $usableAnswerId = array_keys($_POST)[0];
    $query = "SELECT question_id, answer_id FROM answers a1
        WHERE a1.question_id IN (
            SELECT question_id FROM question qst1
            WHERE qst1.quiz_id IN (
                SELECT quiz_id FROM question
                WHERE question_id = :questionId
            )
        )
        and a1.correct_answer = 1";
    $stmt = $tmpPdo->prepare($query);
    $stmt->bindParam(":questionId", $usableAnswerId);
    $stmt->execute();
    return $stmt->fetchAll();
}

/**
* Calculates the result of this attempt as a percentage.
* @param array $res An array of questionId=>answerId pairs.
* @return string a JSON encoded string of the result in the format {"result": number}
**/
function getMark($res){
    $correctAnswers = 0;
    foreach($res as $qId=>$aId){
        if(!isset($aId["question_id"]) || !isset($_POST[$aId["question_id"]])){
            continue;
        }
        if($_POST[$aId["question_id"]] == $aId["answer_id"]){
            $correctAnswers++;
        }
    }
    $mark =(($correctAnswers /count($res))* 100);
    $resObject = array();
    $resObject["result"] = $mark;
    return json_encode($resObject);
}

/**
* Converts relational quiz array to a hierarchical JSON string.
* @return string A JSON string of an array of quiz questions and their answers.
**/
function toHierarchicalQuiz($array){
    $ret_array = array();
    foreach($array as $row){
        $rowArray = array();
        $rowArray["id"] = $row["question_id"];
        $rowArray["question"] = $row["question"];
        $answer_array = explode(",", $row["AllAnswers"]);
        $rowArray["answers"] = array();
        foreach($answer_array as $answer){
            $answerObject = array();
            $answerIdPair = explode(":", $answer);
            $answerObject["id"] = $answerIdPair[0];
            $answerObject["answer"] = $answerIdPair[1];
            array_push($rowArray["answers"], $answerObject);
        }

        array_push($ret_array, $rowArray);
    }

    return $ret_array;
}

