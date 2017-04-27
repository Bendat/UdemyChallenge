define(["require", "exports", "knockout"], function (require, exports, ko) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Quiz {
        constructor(quiz, parent) {
            this.name = ko.observable(quiz["name"]);
            this.id = quiz["quiz_id"];
            this.questions = ko.observableArray([]);
            this.parent = parent;
            this.result = ko.observable(-1);
        }
        isComplete() {
            return this.questions().length > 0;
        }
        addQaPairs(list) {
            console.log(list);
            let json = JSON.parse(list);
            for (let row of json) {
                this.questions.push(row);
            }
            this.parent.currentQuiz(this);
        }
        setCurrent() {
            if (!this.isComplete()) {
                $.ajax({
                    type: "GET",
                    url: "../../api/submitQuiz.php",
                    data: `quizId=${this.id}`,
                    datatype: "json",
                    context: this,
                    success: this.addQaPairs
                });
            }
            else {
                this.parent.currentQuiz(this);
            }
        }
    }
    exports.Quiz = Quiz;
});
