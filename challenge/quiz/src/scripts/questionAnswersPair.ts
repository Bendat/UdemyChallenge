/**
 * Represents a question and it's possible answers.
 */
export interface questionAnswersPair {
    id: string;
    question: string;
    answers: KnockoutObservableArray<answerStatusPair>;
}

/**
 * Represents an answer and whether it's the correct answer for its associated question.
 */
export interface answerStatusPair {
    answer: string;
    status: boolean;
}
