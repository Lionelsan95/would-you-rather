import React from "react";
import {connect} from "react-redux";
import {OPTION_ONE, OPTION_TWO, TITLE} from "../utils/_DATA";
import {Redirect} from "react-router-dom";
import {handleAnswerQuestion} from "../actions/questions";

class AnswerQuestion extends React.Component{

    state = {
        choix: '',
        goHome: false
    }

    handleSubmit = (e) => {

        const {question} = this.props

        e.preventDefault()

        this.props.dispatch(handleAnswerQuestion(question.id, this.state.choix))

        this.setState(() => ({
            goHome:true
        }))
    }

    handleChoice = (e) => {
        this.setState(() => ({
            choix: e.target.value
        }))
    }

    render() {

        const {choix, goHome} = this.state

        if(goHome || this.props.authedUser === null){
            return <Redirect to='/' />
        }

        const {user, question} = this.props

        if( user === null || question === null){
            return (
                <div>
                    Loading hj ...
                </div>
            )
        }

        return(
            <div>
                <div className='__header'>
                    {user.name} asks:
                </div>

                <div className='__content'>

                    <h4> {TITLE} ...</h4>

                    <form onSubmit={this.handleSubmit}>
                        <div className='radio'>
                            <label>
                                <input type='radio' value={OPTION_ONE} name='question' onChange={this.handleChoice}/>
                                {question.optionOne.text}
                            </label>
                        </div>

                        <div className='radio'>
                            <label>
                                <input type='radio' value={OPTION_TWO} name='question' onChange={this.handleChoice}/>
                                {question.optionTwo.text}
                            </label>
                        </div>

                        <button className='btn'
                                type='submit'
                                disabled={choix === ''}>
                            Submit
                        </button>
                    </form>

                </div>
            </div>
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