import React, {Component} from "react";
import {connect} from "react-redux";
import {TITLE} from "../utils/_DATA";
import {handleAddQuestion} from "../actions/questions";
import {Redirect} from "react-router-dom";

class NewQuestion extends Component {

    state = {
        optionOne: '',
        optionTwo: '',
        completed: false
    }

    handleOne = (e) => {
        this.setState(() => ({
            optionOne: e.target.value
        }))
    }

    handleTwo = (e) => {
        this.setState(() => ({
            optionTwo: e.target.value
        }))
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const {optionOne, optionTwo} = this.state

        //Dispatch add question event
        this.props.dispatch(handleAddQuestion(optionOne, optionTwo))

        this.setState((e) => ({
            optionOne: '',
            optionTwo: '',
            completed: true
        }))

    }

    render() {

        //Configure redirection

        // console.log('authedUser', this.props.authedUser)

        const {optionOne, optionTwo, completed} = this.state

        if(completed === true || this.props.authedUser === null) {
            return <Redirect to='/' />
        }

        return (
            <div>
                <div className='__header'>
                    <h3>Create New Question</h3>
                </div>
                <p>Complete the question:</p>

                <form className='__form' onSubmit={this.handleSubmit}>
                    {TITLE}

                    <br/>
                    <label>
                        <input onChange={this.handleOne} value={optionOne} placeholder='Enter Option One Text Here'/>
                    </label>
                    <br/>

                    <div className='hr-sect'>OR</div>

                    <label>
                        <input onChange={this.handleTwo} value={optionTwo} placeholder='Enter Option Two Text Here' />
                    </label>
                    <br/>

                    <button className='btn'>
                        Submit
                    </button>
                </form>

            </div>
        )
    }
}

function mapStateToProps({authedUser}){
    return {
        authedUser
    }
}

export default connect(mapStateToProps)(NewQuestion)