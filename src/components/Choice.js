import React from "react";
import {TITLE} from "../utils/_DATA";

const Choice = ({content, totalVotes, nbVotes, choosed}) => {
    return (
        <div className='__question'>
            {choosed && <span>-- Your vote --</span>}
            {TITLE} - {content} ?
            <p> {nbVotes} out {totalVotes} votes </p>
        </div>
    )
}

export default Choice