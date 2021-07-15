import React, {Component} from "react";
import {connect} from "react-redux";
import {logInUser} from "../actions/authedUser";

class Authentication extends Component{

    state = {
        user: ''
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
        }))
    }

    render(){
        const {users} = this.props
        const {user} = this.state

        return (
            <div className='authentication'>

                <div className='authentication__header'>
                    <h3> Would You Rather Game :-D </h3>
                    <h5>Please sign in to continue</h5>
                </div>

                <img
                    className='authentication__icon'
                    alt='Icon'
                />
                <hr/>
                <form className='authentication__signin' onSubmit={this.handleSubmit}>
                    <select onChange={this.handleChange} value={user}>
                        {
                            Object.values(users).map(user => (
                                <option key={user.id} value={user.id}>{user.name}</option>
                            ))
                        }
                    </select>
                    <br/>
                    <button>
                        Sign In
                    </button>
                </form>
            </div>
        )
    }
}

function mapStateToProps({users}){
    return {
        users
    }
}
export default connect(mapStateToProps)(Authentication);