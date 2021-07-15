import React from "react";
import {TITLE} from "../utils/_DATA";
import {Card} from "react-bootstrap";

const Choice = ({content, totalVotes, nbVotes, choosed}) => {
    return (
        <div className={choosed ? 'question-choosed' : 'question-not-choosed'}>
            {choosed && <span className='voted-label'>Your vote</span>}
            <Card.Body className='text-bold'>
                <Card.Text>
                    {TITLE} - {content} ?
                </Card.Text>
                <p> {nbVotes} out {totalVotes} votes </p>
            </Card.Body>
        </div>
    )
}

export default Choice