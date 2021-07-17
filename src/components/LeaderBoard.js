import React, {Component} from "react";
import {connect} from "react-redux";
import BoardItem from "./BoardItem";

class LeaderBoard extends Component{
    render() {
        const {users} = this.props
        let nbAnswered = 0, nbCreated = 0
        return (
            <div className='contenu'>
                {
                    Object.values(users).sort((a,b) => ((Object.values(b.answers).length + b.questions.length) > (Object.values(a.answers).length + a.questions.length)) ? 1 : -1).map((user, index) => {
                        nbAnswered = Object.values(user.answers).length
                        nbCreated = user.questions.length

                        return(
                                <BoardItem key={index} avatar={user.avatarURL} name={user.name} answered={nbAnswered} created={nbCreated} rank={index+1} />
                        )
                    })
                }
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