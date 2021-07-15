import React, {Component} from "react";
import {connect} from "react-redux";
import Choice from "./Choice";
import {Redirect} from "react-router-dom";
import {Card} from "react-bootstrap";

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
            <Card className='contenu'>
                <Card.Header>
                    <Card.Title>Asked by {user.name}</Card.Title>
                </Card.Header>

                <Card.Body className='question-content'>
                    <div>
                        <img
                            alt='Avatar'
                        />
                    </div>
                    <div>
                        <Card.Title>Results : </Card.Title>

                        <Choice content={question.optionOne.text} nbVotes={nbOne} totalVotes={total} choosed={choiceOne}/>

                        <Choice content={question.optionTwo.text} nbVotes={nbTwo} totalVotes={total} choosed={choiceTwo}/>

                    </div>
                </Card.Body>
            </Card>
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