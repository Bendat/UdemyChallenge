import * as ko from "knockout";
import { Quiz } from "./Quiz";

declare var $: any;
/**
 * Represents the main page of the website.
 */
export class MainViewModel {

    public quizList: KnockoutObservableArray<Quiz>
    public visibleQuizList: KnockoutComputed<Quiz[]>;
    public currentQuiz: KnockoutObservable<Quiz>;

    public searchText: KnockoutObservable<string>;

    /**
     * Creates a new MainViewModel object.
     */
    constructor() {
        this.quizList = ko.observableArray<Quiz>();
        this.currentQuiz = ko.observable<Quiz>();
        this.searchText = ko.observable<string>();
        this.visibleQuizList = ko.computed(() => {
            var query = this.searchText();
            if (query) {
                return this.quizList().filter((quiz: Quiz) => {
                    return quiz.name().toLowerCase().indexOf(query) >= 0
                });
            } else {
                return this.quizList();
            }
        }, this);

    }

    /**
     * Adds a collection of quizes to this ViewModel.
     * @param {string} list A JSON encoded string of quiz objects, or skeleton quiz objects.
     * @param textStatus 
     * @param jqXJHR 
     */
    public addQuizes(list: string, textStatus: string = null, jqXJHR: any = null): void {
        let json = JSON.parse(list);
        for (let quiz of json) {
            this.quizList.push(new Quiz(quiz, this))
        }
    }

    /**
     * Shows the result achieved on this quiz.
     * @param {string} list A JSON encoded string of the result.
     */
    public showResult(list: string): void{
        let json = JSON.parse(list);
        this.currentQuiz().result(parseInt(json["result"]));
    }
}