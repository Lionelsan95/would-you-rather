import React from "react"
import {Card} from "react-bootstrap"
import { Icon } from '@iconify/react'
import trophyIcon from '@iconify-icons/mdi/trophy'

const BoardItem = ({name, avatar, answered, created, rank}) => {
    return (
        <div className='leader-board'>
            <div className='triangle'></div>
            <Icon className={rank === 1 ? 'gold' : (rank === 2 ? 'silver' : 'bronze')} icon={trophyIcon} />
            <div className='img-centered'>
                <img src={avatar} className='img-rounded' alt='Avatar'/>
            </div>
            <div className='information'>
                <h4>{name}</h4>
                <div>Answered questions <span>{answered}</span></div>
                <hr/>
                <div>Created questions <span>{created}</span></div>
            </div>
            <Card className='score text-center'>
                <Card.Header>Score</Card.Header>
                <Card.Body>
                    <span className='item-rounded score-text'>{answered + created}</span>
                </Card.Body>
            </Card>
        </div>
    )
}

export default BoardItem;