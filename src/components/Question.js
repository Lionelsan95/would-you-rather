import React, {Component} from "react";
import {connect} from "react-redux";
import {Link} from 'react-router-dom'

class Question extends Component{
    render() {
        const {user, question, authedUser} = this.props

        if (user === null || question === null ){
            return (
                <h4>Loading question ... </h4>
            )
        }else {
            const preview = question.optionOne.text.substring(0,question.optionOne.text.length/5)
            const linkTo = (!question.optionTwo.votes.includes(authedUser) && !question.optionOne.votes.includes(authedUser)) ?  '/questions/'+question.id+'/answer' : '/questions/'+question.id
            return(
                <div>
                    <h4>{user.name } asks : </h4>
                    <div>
                        <div>
                            <img src={user.avatarURL} alt='Avatar'/>
                        </div>
                        <div>
                            <h5>Would you rather</h5>
                            <p>... {preview} ...</p>
                            <Link to={linkTo}>
                                <button>View pull</button>
                            </Link>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

function mapStateToProps({users, questions, authedUser}, {id}){
    const question = (typeof questions[id] === 'undefined') ? null:questions[id]
    return {
        user: question === null ? null : users[question.author],
        question,
        authedUser
    }
}

export default connect(mapStateToProps)(Question)