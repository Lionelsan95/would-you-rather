import React, {Component} from "react";
import {connect} from "react-redux";
import BoardItem from "./BoardItem";

class LeaderBoard extends Component{
    render() {
        const {users} = this.props
        let nbAnswered = 0, nbCreated = 0
        return (
            <div>
                <ul>
                    {
                        Object.values(users).sort((a,b) => ((Object.values(b.answers).length + b.questions.length) > (Object.values(a.answers).length + a.questions.length)) ? 1 : -1).map(user => {
                            nbAnswered = Object.values(user.answers).length
                            nbCreated = user.questions.length
                            return(
                                <li key={user.id}>
                                    <BoardItem name={user.name} answered={nbAnswered} created={nbCreated} />
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}

function mapStateToProps({users}){
    return {
        users
    }
}

export default connect(mapStateToProps)(LeaderBoard)