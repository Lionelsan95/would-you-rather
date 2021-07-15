import React from "react";
import {Card} from "react-bootstrap";

const BoardItem = ({name, answered, created}) => {
    return (
        <div className='leader-board'>
            <div className='__avatar'>
                <img alt='Avatar'/>
            </div>
            <div className='__information'>
                <h4>{name}</h4>
                <div>Answered questions <span>{answered}</span></div>
                <hr/>
                <div>Created questions <span>{created}</span></div>
            </div>
            <Card className='__score'>
                <Card.Header>Score</Card.Header>
                <Card.Body><span>{answered + created}</span></Card.Body>
            </Card>
        </div>
    )
}

export default BoardItem;