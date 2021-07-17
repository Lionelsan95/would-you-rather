import React, {Component} from "react";
import {connect} from "react-redux";
import {logInUser} from "../actions/authedUser";
import {TITLE} from "../utils/_DATA";
import {Button, Card} from "react-bootstrap";

class Authentication extends Component{

    state = {
        user: '',
        authenticated: false
    }

    handleChange = (e) =>{
        const user = e.target.value
        this.setState(() => ({
            user
        }))
    }

    componentDidMount() {
        this.setState(() => ({
            user: Object.values(this.props.users)[0].id
        }))
    }

    handleSubmit = (e) =>{
        e.preventDefault()

        this.props.dispatch(logInUser(this.state.user))
        this.setState(() => ({
            users: '',
            authenticated: true
        }))
    }

    render(){
        const {users} = this.props
        const {user} = this.state
        let img = 'https://softstribe.com/app/uploads/icons/net-wouldyouratherapp-wouldyourather-icon.jpg'

        return (
            <Card border='secondary' className='boxi contenu'>
                <Card.Header>
                    <Card.Title> Welcome to the {TITLE} App! </Card.Title>
                    <Card.Text>Please sign in to continue</Card.Text>
                </Card.Header>
                <Card.Body>
                    <img
                        src={img}
                        className='authentication__icon'
                        alt='Icon'
                    />
                    <br/>
                    <br/>
                    <Card.Title>Sign in</Card.Title>
                    <form className='authentication__signin' onSubmit={this.handleSubmit}>
                        <select onChange={this.handleChange} value={user} className='form-select'>
                            {
                                Object.values(users).map(user => (
                                    <option key={user.id} value={user.id}>
                                        {user.name}
                                    </option>
                                ))
                            }
                        </select>
                        <br/>
                        <Button type='submit' variant='info' className='fit'>
                            Sign In
                        </Button>
                    </form>
                </Card.Body>
            </Card>
        )
    }
}

function mapStateToProps({users}){
    return {
        users
    }
}
export default connect(mapStateToProps)(Authentication);