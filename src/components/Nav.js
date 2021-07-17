import React from "react";
import {connect} from "react-redux";
import {NavLink} from "react-router-dom";
import {logOutUser} from "../actions/authedUser";


class Nav extends React.Component {

    state = {
        connected: false
    }

    handleLogOut = (e) => {
        e.preventDefault()
        this.props.dispatch(logOutUser(this.props.authedUser))
    }

    render() {
        const {user} = this.props
        return (
            <nav className='nav'>
                <ul>
                    <li className='nav-link active-nav'>
                        <NavLink to='/' exact >
                            Home
                        </NavLink>
                    </li>
                    { (user !== null && typeof user !== 'undefined') && <li className='nav-link'>
                        <NavLink to='/add' exact activeClassName='active'>
                            New Question
                        </NavLink>
                    </li>
                    }
                    <li className='nav-link'>
                        <NavLink to='/leaderboard' exact activeClassName='active'>
                            Leader Board
                        </NavLink>
                    </li>
                    { (user !== null && typeof user !== 'undefined') &&
                        <li className='img-centered avoid-new-line'>
                            Hello, {user.name}
                            <img
                                src={`${user.avatarURL}`}
                                alt='Avatar user'
                                className='user-img'
                            />
                        </li>
                    }
                    { (user !== null && typeof user !== 'undefined') && <li onClick={this.handleLogOut}  className='nav-link'>
                        <NavLink to='/'>
                            Log out
                        </NavLink>
                    </li>
                    }
                </ul>
            </nav>
        )
    }
}

function mapStateToPros({authedUser, users}){
    return {
        user: authedUser === null ? null : users[authedUser]
    }
}

export default connect(mapStateToPros)(Nav);