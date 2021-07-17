import React, {Component} from "react";
import {connect} from "react-redux";
import {Link} from 'react-router-dom'
import {Button, Card} from "react-bootstrap";

class Question extends Component{
    render() {
        const {user, question, authedUser} = this.props

        if (user === null || question === null ){
            return (
                <h4>Loading question ... </h4>
            )
        }else {
            const previewLen = Math.ceil(question.optionOne.text.length/5), preview = question.optionOne.text.substring(0, previewLen)
            const linkTo = (!question.optionTwo.votes.includes(authedUser) && !question.optionOne.votes.includes(authedUser)) ?  '/questions/'+question.id+'/answer' : '/questions/'+question.id
            return(
                <Card>
                    <Card.Header>
                        <Card.Title>{user.name } asks : </Card.Title>
                    </Card.Header>
                    <Card.Body className='flex-box'>
                        <div className='img-centered img-box'>
                            <img className='img-rounded' src={user.avatarURL} alt='Avatar'/>
                        </div>
                        <div className='question-info'>
                            <h5>Would you rather</h5>
                            <p>... {preview} ...</p>
                            <Link to={linkTo}>
                                <Button className='fit' variant='info'>View Poll</Button>
                            </Link>
                        </div>
                    </Card.Body>
                </Card>
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