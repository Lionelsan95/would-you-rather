import React from "react";
import Question from "./Question";

const QuestionList = ({questions}) => {
    return (
        <ul>
            {questions.sort((a,b) => (b.timestamp > a.timestamp) ? 1 : -1).map(question => (
                <Question key={question.id} id={question.id} />
            ))}
        </ul>
    )
}

export default QuestionList