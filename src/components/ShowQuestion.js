import React, {Component} from "react";
import {connect} from "react-redux";
import Choice from "./Choice";
import {Card} from "react-bootstrap";
import {Redirect} from "react-router-dom";

class ShowQuestion extends Component {

    render() {

        const {user, question} = this.props

        if(this.props.authedUser === null) {
            try{
                this.props.history.push('/')
            }catch (e) {
                return <Redirect to='/' />
            }
        }

        if( user === null || question === null){
            return (
                <h4>
                    Error 404, requested question does not exists
                </h4>
            )
        }

        const   nbOne = question.optionOne.votes.length,
                nbTwo = question.optionTwo.votes.length,
                total = nbOne + nbTwo,
                percentOne = parseFloat((nbOne/total*100)).toFixed(2),
                percentTwo = parseFloat((nbTwo/total)*100).toFixed(2)

        const choiceOne = user.answers[question.id] === 'optionOne' ? true:false;
        const choiceTwo = user.answers[question.id] === 'optionTwo' ? true:false;

        return (
            <Card className='contenu'>
                <Card.Header>
                    <Card.Title>Asked by {user.name}</Card.Title>
                </Card.Header>

                <Card.Body className='flex-box'>
                    <div className='img-centered img-box'>
                        <img
                            className='img-rounded'
                            src={user.avatarURL}
                            alt='Avatar'
                        />
                    </div>
                    <div className='answer-content question-info'>
                        <Card.Title>Results : </Card.Title>

                        <Choice content={question.optionOne.text} nbVotes={nbOne} totalVotes={total} percent={percentOne} choosed={choiceOne}/>

                        <Choice content={question.optionTwo.text} nbVotes={nbTwo} totalVotes={total} percent={percentTwo} choosed={choiceTwo}/>

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