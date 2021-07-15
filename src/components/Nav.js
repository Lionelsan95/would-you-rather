import React from "react";
import {connect} from "react-redux";
import {NavLink} from "react-router-dom";
import {logOutUser} from "../actions/authedUser";

class Nav extends React.Component {

    handleLogOut = (e) => {
        e.preventDefault()
        this.props.dispatch(logOutUser(this.props.authedUser))
    }

    render() {
        const {user} = this.props

        return (
            <nav className='nav'>
                <ul>
                    <li>
                        <NavLink to='/' exact activeClassName='active'>
                            Home
                        </NavLink>
                    </li>
                    { (user !== null && typeof user !== 'undefined') && <li>
                        <NavLink to='/add' exact activeClassName='active'>
                            New Question
                        </NavLink>
                    </li>
                    }
                    <li>
                        <NavLink to='/leaderboard' exact activeClassName='active'>
                            Leader Board
                        </NavLink>
                    </li>
                    { (user !== null && typeof user !== 'undefined') && <li>
                            <NavLink to='/new' activeClassName='active'>
                                Hello {user.name}
                                <img
                                    alt='Avatar user'
                                />
                            </NavLink>
                        </li>
                    }
                    { (user !== null && typeof user !== 'undefined') && <li onClick={this.handleLogOut}>
                        <NavLink to='/' activeClassName='active'>
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