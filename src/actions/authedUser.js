export const LOG_IN_USER = 'LOG_IN_USER'
export const LOG_OUT_USER = 'LOG_OUT_USER'

export function logInUser(id){
    return {
        type: LOG_IN_USER,
        id
    }
}

export function logOutUser(id){
    return {
        type: LOG_OUT_USER,
        id
    }
}