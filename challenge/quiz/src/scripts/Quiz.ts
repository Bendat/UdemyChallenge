import { questionAnswersPair } from "./questionAnswersPair";
import { MainViewModel } from "./MainViewModel";
import * as ko from "knockout";
declare var $: any;
/**
 * Represents a Quiz.
 */
export class Quiz {
    
    public readonly id: string;
    public name: KnockoutObservable<string>;
    public questions: KnockoutObservableArray<questionAnswersPair>;
    public parent: MainViewModel;
    public result: KnockoutObservable<number>;
    /**
     * Creates a new Quiz object.
     * @param {Object} quiz a JSON object to produce a skeleton Quiz object with.
     * @param {string} quiz.name The name of the quiz.
     * @param {string} quiz.id The databse id of the quiz.
     * @param {MainViewModel} parent The MainViewModel object of which this quiz is a child.
     */
    constructor(quiz: Object, parent: MainViewModel) {
        this.name = ko.observable<string>(quiz["name"]);
        this.id = quiz["quiz_id"];
        this.questions = ko.observableArray<questionAnswersPair>([]);
        this.parent = parent;
        this.result = ko.observable(-1);
    }

    /**
     * Indicates if this is a complete or skeleton object. A skeleton Quiz is one which has no questions or answers associated with it yet.
     * Incomplete Quiz objects are used for the sidebar until they have been opened.
     * @return {boolean} True if this objects questions array has been populated.
     */
    public isComplete(): boolean {
        return this.questions().length > 0;
    }

    /**
     * Adds Questions objects to the questions observable array.
     * @param {string} list A JSON string of QuestionAnswersPair objects
     * @see {@link questionAnswersPair.ts}
     */
    public addQaPairs(list: string): void {
        let json = JSON.parse(list);
        for (let row of json) {
            this.questions.push(row);
        }
        this.parent.currentQuiz(this);
    }

    /**
     * Sets this Quiz as the current active quiz in it's parent ViewModel
     */
    public setCurrent(): void{
        // If this Quiz is a skeleton object, retrieve its Questions and their associated answers.
        if (!this.isComplete()) {
            $.ajax({
                type: "GET",
                url: "../../api/submitQuiz.php",
                data: `quizId=${this.id}`,
                datatype: "json",
                context: this,
                success: this.addQaPairs
            });
        } else {
            this.parent.currentQuiz(this);
        }
    }
}