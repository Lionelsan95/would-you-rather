import {saveQuestion, saveQuestionAnswer} from "../utils/api";
import {addUserQuestion, answerUserQuestion} from "./users";

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const ADD_QUESTION = 'ADD_QUESTION';
export const ANSWER_QUESTION = 'ANSWER_QUESTION';


export function receiveQuestions (questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions
    }
}

function addQuestion(question){
    return {
        type: ADD_QUESTION,
        question
    }
}

function answerQuestion(questionId, userId, answer){
    return {
        type: ANSWER_QUESTION,
        questionId,
        userId,
        answer
    }
}

export function handleAddQuestion(optionOneText, optionTwoText){
    return (dispatch, getState) => {
        const {authedUser} = getState()
        //dispatch(showLoading())
        return saveQuestion({
            optionOneText,
            optionTwoText,
            author: authedUser
        }).then((question) => {
            dispatch(addQuestion(question))
            dispatch(addUserQuestion(authedUser, question.id))
            })
            //.then(() => dispatch(hideLoading()))
    }
}

export function handleAnswerQuestion(qid, answer){
    return (dispatch, getState) => {
        const {authedUser} = getState()
        //dispatch(showLoading())
        return saveQuestionAnswer({
            answer,
            qid,
            authedUser
        }).then(() => {
            dispatch(answerQuestion(qid, authedUser, answer))
            dispatch(answerUserQuestion(authedUser, qid, answer))
        })
        //.then(() => dispatch(hideLoading()))
    }
}