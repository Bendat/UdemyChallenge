define(["require", "exports", "knockout", "./Quiz"], function (require, exports, ko, Quiz_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class MainViewModel {
        constructor() {
            this.quizList = ko.observableArray();
            this.currentQuiz = ko.observable();
            this.searchText = ko.observable();
            this.visibleQuizList = ko.computed(() => {
                var query = this.searchText();
                if (query) {
                    return this.quizList().filter((quiz) => {
                        return quiz.name().toLowerCase().indexOf(query) >= 0;
                    });
                }
                else {
                    return this.quizList();
                }
            }, this);
        }
        addQuizes(list, textStatus = null, jqXJHR = null) {
            console.log(list);
            let json = JSON.parse(list);
            for (let quiz of json) {
                this.quizList.push(new Quiz_1.Quiz(quiz, this));
            }
        }
        showResult(list) {
            console.log("chosen");
            let json = JSON.parse(list);
            this.currentQuiz().result(parseInt(json["result"]));
        }
    }
    exports.MainViewModel = MainViewModel;
});
