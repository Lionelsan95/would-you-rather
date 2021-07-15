import React, {Component} from "react";
import {connect} from "react-redux";
import QuestionList from "./QuestionList";

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

            const answerred = Object.values(questions).filter(question => (question.optionTwo.votes.includes(authedUser) || question.optionOne.votes.includes(authedUser)) ),
                  unAnswered = Object.values(questions).filter(question =>  (!question.optionTwo.votes.includes(authedUser) && !question.optionOne.votes.includes(authedUser)))

            const questionLists = this.state.showAnswered ? answerred : unAnswered

            return(
                <div>
                    <ul>
                        <li onClick={this.toggleAnswer}>Unanswered Questions</li>
                        <li onClick={this.toggleAnswer}>Answered Questions</li>
                    </ul>

                    <QuestionList questions={questionLists}/>
                </div>
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