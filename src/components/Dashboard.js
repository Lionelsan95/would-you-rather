import React, {Component} from "react";
import {connect} from "react-redux";
import QuestionList from "./QuestionList";
import {Card} from "react-bootstrap";

class Dashboard extends Component{

    state = {
        showAnswered: false
    }

    toggleAnswer = (e) => {
        e.preventDefault()
        this.setState(() => ({
            showAnswered: !this.state.showAnswered
        }))
    }

    render() {
        const {loading, questions, authedUser} = this.props

        if(loading){
            return (
                <h5>Loading dashboard questions ...</h5>
            )
        }else{

            const {showAnswered} = this.state

            const answerred = Object.values(questions).filter(question => (question.optionTwo.votes.includes(authedUser) || question.optionOne.votes.includes(authedUser)) ),
                  unAnswered = Object.values(questions).filter(question =>  (!question.optionTwo.votes.includes(authedUser) && !question.optionOne.votes.includes(authedUser)))

            const questionLists = showAnswered ? answerred : unAnswered

            return(
                <Card className='contenu'>
                    <div className='header_nav'>
                        <ul className='option'>
                            <li className={!showAnswered ? 'option-li-active' : ''} onClick={this.toggleAnswer}>Unanswered Questions</li>
                            <li className={showAnswered ? 'option-li-active' : ''} onClick={this.toggleAnswer}>Answered Questions</li>
                        </ul>
                    </div>
                    <Card.Body>
                        <QuestionList questions={questionLists}/>
                    </Card.Body>
                </Card>
            )
        }
    }
}

function mapStateToProps({questions, authedUser}) {
    return {
        loading: questions.length < 1,
        questions,
        authedUser
    }
}
export default connect(mapStateToProps)(Dashboard);