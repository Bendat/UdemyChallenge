define("questionAnswersPair", ["require", "exports"], function(require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("Quiz", ["require", "exports"], function(require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Quiz {
        constructor(quiz) {
            this.name = quiz["name"];
            this.id = quiz["quiz_id"];
        }
    }
    exports.Quiz = Quiz;
});
define("MainViewModel", ["require", "exports", "Quiz"], function(require, exports, Quiz_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class MainViewModel {
        constructor() {}
        addQuizes(list, textStatus = null, jqXJHR = null) {
            console.log(list);
            list = JSON.parse(list);
            for (let quiz of list) {
                this.quizList.push(new Quiz_1.Quiz(quiz));
            }
        }
        setCurrent(data, event) {
            console.log(event.target.id);
        }
    }
    exports.MainViewModel = MainViewModel;
});