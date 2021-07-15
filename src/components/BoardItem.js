import React from "react";

const BoardItem = ({name, answered, created}) => {
    return (
        <div className='box'>
            <span>Rank</span>
            <div className='__avatar'>
                <img alt='Avatar'/>
            </div>
            <div className='__information'>
                <h4>{name}</h4>
                <div>Answered questions <span>{answered}</span></div>
                <hr/>
                <div>Created questions <span>{created}</span></div>
            </div>
            <div className='__score'>
                <div>Score</div>
                <div><span>{answered + created}</span></div>
            </div>
        </div>
    )
}

export default BoardItem;