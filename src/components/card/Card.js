import React, { useState, useEffect } from 'react'
import './card.scss'
import { IconButton, Button } from '@material-ui/core'
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';
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
        expandAll
    } = props
    const [isExpand, setIsExpand] = useState(expandAll)
    useEffect(() => {
        setIsExpand(expandAll)
    }, [expandAll])
    return (
        <div className="card">
            <div className="card-header">
                <span>{title}</span>
                <span>{writer}</span>
            </div>
            <div className="card-body">
                <pre dangerouslySetInnerHTML={{
                    __html: description.length > 150 ? description.slice(0, 150) + ' ... ' : description
                }} />
            </div>
            <div className="card-footer">
                <div className="card-footer-likes">
                    <Button
                        variant="outlined"
                        startIcon={<FavoriteOutlinedIcon />}
                    >
                        1.2K
                    </Button>
                    <Button
                        variant="outlined"
                        startIcon={<ThumbUpAltOutlinedIcon />}
                    >
                        1.2K
                    </Button>
                    <IconButton>
                        <BookmarkBorderOutlinedIcon />
                    </IconButton>
                </div>
                <div className="card-footer-last-updated">
                    <ScheduleOutlinedIcon />
                    &nbsp;&nbsp;2020-07-12 14:05
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
            <div className={`card-expand ${isExpand ? 'is-active' : ''}`}>
                <div className="card-expand-row">
                    <div className="card-expand-item">參與作家: 15</div>
                    <div className="card-expand-item">瀏覽次數: 200</div>
                    <div className="card-expand-item">總字數: 200</div>
                </div>
                <div className="card-expand-row">
                    <Button variant="text">#Sc-fi</Button>
                    <Button variant="text">#Sc-fi</Button>
                    <Button variant="text">#Sc-fi</Button>
                    <Button variant="text">#Sc-fi</Button>
                    <Button variant="text">#Sc-fi</Button>
                    <Button variant="text">#Sc-fi</Button>
                    <Button variant="text">#Sc-fi</Button>
                    <Button variant="text">#Sc-fi</Button>
                    <Button variant="text">#Sc-fi</Button>
                    <Button variant="text">#Sc-fi</Button>
                </div>
            </div>
        </div>
    )
}

export default Card