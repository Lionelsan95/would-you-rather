import React, {Component} from "react";
import {connect} from "react-redux";
import Choice from "./Choice";
import {Redirect} from "react-router-dom";

class ShowQuestion extends Component {
    render() {
        const {user, question} = this.props

        if(this.props.authedUser === null) {
            return <Redirect to='/' />
        }

        if( user === null || question === null){
            return (
                <div>
                    Loading ...
                </div>
            )
        }

        const   nbOne = question.optionOne.votes.length,
                nbTwo = question.optionTwo.votes.length,
                total = nbOne + nbTwo
        const choiceOne = user.answers[question.id] === 'optionOne' ? true:false;
        const choiceTwo = user.answers[question.id] === 'optionTwo' ? true:false;

        return (
            <div>
                <div className='__header'>
                    <h5>Asked by {user.name}</h5>
                </div>

                <div className='__content'>
                    <div>
                        <img
                            alt='Avatar'
                        />
                    </div>
                    <div>
                        <h4>Results : </h4>

                        <Choice content={question.optionOne.text} nbVotes={nbOne} totalVotes={total} choosed={choiceOne}/>

                        <Choice content={question.optionTwo.text} nbVotes={nbTwo} totalVotes={total} choosed={choiceTwo}/>

                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps({authedUser, questions, users}, props){
    const {question_id} = props.match.params
    const question = (typeof questions[question_id] === 'undefined') ? null:questions[question_id]
    const user = question === null ? null : users[question.author]
    return {
        authedUser,
        question,
        user
    }
}
export default connect(mapStateToProps)(ShowQuestion)