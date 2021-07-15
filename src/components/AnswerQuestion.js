import React from "react";
import {connect} from "react-redux";
import {OPTION_ONE, OPTION_TWO, TITLE} from "../utils/_DATA";
import {Redirect} from "react-router-dom";
import {handleAnswerQuestion} from "../actions/questions";
import {Button, Card} from "react-bootstrap";

class AnswerQuestion extends React.Component{

    state = {
        choix: '',
        showResult: false
    }

    handleSubmit = (e) => {

        const {question} = this.props

        e.preventDefault()

        this.props.dispatch(handleAnswerQuestion(question.id, this.state.choix))

        this.setState(() => ({
            showResult:true
        }))
    }

    handleChoice = (e) => {
        this.setState(() => ({
            choix: e.target.value
        }))
    }

    render() {

        const {choix, showResult} = this.state

        if(this.props.authedUser === null){
            return <Redirect to='/' />
        }

        const {user, question} = this.props

        if(showResult === true){
            return <Redirect to={`/questions/${question.id}`} />
        }

        if( user === null || question === null){
            return (
                <div>
                    Loading ...
                </div>
            )
        }

        return(
            <Card className='contenu'>
                <Card.Header>
                    <Card.Title>
                        {user.name} asks:
                    </Card.Title>
                </Card.Header>

                <Card.Body className='question-content'>
                    <div>
                        <img alt='avatar user' />
                    </div>

                    <div>
                        <h4> {TITLE} ...</h4>
                        <form onSubmit={this.handleSubmit}>

                            <div className='form-check'>
                                <input type='radio' className='form-check-input' value={OPTION_ONE} name='question' onChange={this.handleChoice} id='optionOne'/>
                                <label className='form-check-label' for='optionOne'>
                                    {question.optionOne.text}
                                </label>
                            </div>

                            <div className='form-check'>
                                <input type='radio' className='form-check-input' value={OPTION_TWO} name='question' onChange={this.handleChoice} id='optionTwo'/>
                                <label className='form-check-label' for='optionTwo'>
                                    {question.optionTwo.text}
                                </label>
                            </div>

                            <Button className='btn fit'
                                    type='submit'
                                    disabled={choix === ''}>
                                Submit
                            </Button>
                        </form>
                    </div>

                </Card.Body>
            </Card>
        )
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
export default connect(mapStateToProps)(AnswerQuestion)