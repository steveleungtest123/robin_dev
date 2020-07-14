import React, { useState } from 'react'
import './card.scss'
import { IconButton, Button } from '@material-ui/core'
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import BookmarkBorderOutlinedIcon from '@material-ui/icons/BookmarkBorderOutlined';
import ScheduleOutlinedIcon from '@material-ui/icons/ScheduleOutlined';
import KeyboardArrowDownOutlinedIcon from '@material-ui/icons/KeyboardArrowDownOutlined';
import KeyboardArrowUpOutlinedIcon from '@material-ui/icons/KeyboardArrowUpOutlined';

const Card = (props) => {
    const {
        title,
        writer,
        description,
        total_likes,
        total_votes,
        total_writers,
        total_words,
        total_visited,
        total_comments,
        tags,
        updated,
        id
    } = props.story
    const {
        onClick
    } = props
    const [isExpand, setIsExpand] = useState(false)
    return (
        <div className="card">
            <div className="card-header">
                <span>{title}</span>
                <span style={{fontSize: '14px'}}>{writer}</span>
            </div>
            <div className="card-body"
                onClick={() => onClick(props.story)}
            >
                <pre dangerouslySetInnerHTML={{
                    __html: description.length > 150 ? description.slice(0, 150) + ' ... ' : description
                }} />
                <div>
                    last seen
                </div>
            </div>
            <div className="card-footer">
                <div className="card-footer-likes">
                    <Button
                        variant="outlined"
                        startIcon={<FavoriteBorderOutlinedIcon />}
                    >
                        {total_likes}
                    </Button>
                    <Button
                        variant="outlined"
                        startIcon={<ThumbUpAltOutlinedIcon />}
                    >
                        {total_votes}
                    </Button>
                    <IconButton>
                        <BookmarkBorderOutlinedIcon />
                    </IconButton>
                </div>
                <div className="card-footer-last-updated">
                    <ScheduleOutlinedIcon />
                    &nbsp;&nbsp;{updated.slice(0, 10)}
                </div>
            </div>
            <div className={`card-expand ${isExpand ? 'is-active' : ''}`}>
                <div className="card-expand-row">
                    <div className="card-expand-item">參與作家: {total_writers}</div>
                    <div className="card-expand-item">瀏覽次數: {total_visited}</div>
                    <div className="card-expand-item">總字數: {total_words}</div>
                    <div className="card-expand-item">留言: {total_comments}</div>
                </div>
                <div className="card-expand-row">
                    {
                        tags.split(/(?=#)/).map((tag, idx) => 
                            <Button 
                                key={`story-${id}-tag-${idx}`}
                                variant="text"
                            >
                                {tag}
                            </Button>)
                    }
                </div>
            </div>
            <div className="card-expand-controller"
                onClick={() => setIsExpand(!isExpand)}
            >
                {
                    isExpand ?
                        <KeyboardArrowUpOutlinedIcon />
                        :
                        <KeyboardArrowDownOutlinedIcon />
                }
            </div>
        </div>
    )
}

export default Card