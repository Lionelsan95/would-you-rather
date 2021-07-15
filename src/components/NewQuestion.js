import React, {Component} from "react";
import {connect} from "react-redux";
import {TITLE} from "../utils/_DATA";
import {handleAddQuestion} from "../actions/questions";
import {Redirect} from "react-router-dom";
import {Button, Card} from "react-bootstrap";

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

        const {optionOne, optionTwo, completed} = this.state

        if(completed === true || this.props.authedUser === null) {
            return <Redirect to='/' />
        }

        return (
            <Card className='contenu text-center'>
                <Card.Header>
                    <Card.Title>Create New Question</Card.Title>
                </Card.Header>

                <Card.Body>
                    <Card.Text>Complete the question:</Card.Text>

                    <Card.Title>
                        {TITLE} ...
                    </Card.Title>
                    <form className='__form' onSubmit={this.handleSubmit}>

                        <div className='form-group'>
                            <input className='form-control' onChange={this.handleOne} value={optionOne} placeholder='Enter Option One Text Here'/>
                        </div>

                        <div className='hr-sect'>OR</div>

                        <div className='form-group'>
                            <input className='form-control' onChange={this.handleTwo} value={optionTwo} placeholder='Enter Option Two Text Here' />
                        </div>
                        <br/>
                        <Button className='btn fit'
                                type='submit'
                                disabled={optionOne === '' || optionTwo === ''}>
                            Submit
                        </Button>
                    </form>
                </Card.Body>
            </Card>
        )
    }
}

function mapStateToProps({authedUser}){
    return {
        authedUser
    }
}

export default connect(mapStateToProps)(NewQuestion)