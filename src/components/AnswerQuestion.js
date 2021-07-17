import React from "react"
import {connect} from "react-redux"
import {OPTION_ONE, OPTION_TWO, TITLE} from "../utils/_DATA";
import {Redirect} from "react-router-dom"
import {handleAnswerQuestion} from "../actions/questions"
import {Button, Card} from "react-bootstrap"

class AnswerQuestion extends React.Component{

    state = {
        choix: OPTION_ONE,
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
        const {user, question} = this.props

        if(showResult === true){
            return <Redirect to={`/questions/${question.id}`} />
        }

        if(this.props.authedUser === null){
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

        return(
            <Card className='contenu'>
                <Card.Header>
                    <Card.Title>
                        {user.name} asks:
                    </Card.Title>
                </Card.Header>

                <Card.Body className='flex-box question'>
                    <div className='img-centered img-box'>
                        <img src={user.avatarURL} className='img-rounded' alt='avatar user' />
                    </div>

                    <div className='question-info'>
                        <h4> {TITLE} ...</h4>
                        <form onSubmit={this.handleSubmit}>
                            <div className='form-check'>
                                <input type='radio' className='form-check-input' value={OPTION_ONE} name='question' checked={choix === OPTION_ONE} onChange={this.handleChoice} id='optionOne'/>
                                <label className='form-check-label' htmlFor='optionOne'>
                                    {question.optionOne.text}
                                </label>
                            </div>

                            <div className='form-check'>
                                <input type='radio' className='form-check-input' value={OPTION_TWO} name='question' checked={choix === OPTION_TWO} onChange={this.handleChoice} id='optionTwo'/>
                                <label className='form-check-label' htmlFor='optionTwo'>
                                    {question.optionTwo.text}
                                </label>
                            </div>

                            <Button className='btn btn-info fit'
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