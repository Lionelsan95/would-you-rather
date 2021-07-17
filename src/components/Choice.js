import React from "react";
import {TITLE_IN} from "../utils/_DATA";
import {Card} from "react-bootstrap";
import {ProgressBar} from "react-bootstrap";

const Choice = ({content, totalVotes, nbVotes, choosed, percent}) => {
    return (
        <div className={choosed ? 'question-choosed result-box text-center' : 'question-not-choosed result-box text-center'}>
            {choosed && <span className='item-rounded badge-text'>Your<br/>vote</span>}
            <div>
                <Card.Text className='text-bold'>
                    {TITLE_IN} {content} ?
                </Card.Text>
                <ProgressBar animated variant='info' now={percent} label={`${percent}%`} />
                <p> {nbVotes} out {totalVotes} votes </p>
            </div>
        </div>
    )
}

export default Choice