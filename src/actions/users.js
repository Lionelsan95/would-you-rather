export const RECEIVE_USERS = 'RECEIVE_USERS';
export const ADD_USER_QUESTION = 'ADD_USER_QUESTION';
export const ANSWER_USER_QUESTION = 'ANSWER_USER_QUESTION'

export function receiveUsers(users) {
    return {
        type: RECEIVE_USERS,
        users
    }
}

export function addUserQuestion(userId, questionId){
    return {
        type: ADD_USER_QUESTION,
        userId,
        questionId
    }
}

export function answerUserQuestion(userId, questionId, answer){
    return {
        type: ANSWER_USER_QUESTION,
        userId,
        questionId,
        answer
    }
}