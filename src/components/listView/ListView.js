import React, { useState } from 'react'
import './listView.scss'
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import BlockIcon from '@material-ui/icons/Block';

const ListView = (props) => {
    const {
        items,
        scrollEndCallback,
        onScrolling,
        isEnd,
        isLoading
    } = props
    const trackScrolling = (e) => {
        const { target } = e
        const isBottom = Math.round(target.scrollTop) === (target.scrollHeight - target.offsetHeight)

        onScrolling && onScrolling()

        if (isBottom && !isEnd) scrollEndCallback && scrollEndCallback()
    }
    return (
        <div className="list-view" onScroll={(e) => trackScrolling(e)}>
            {items}
            <div className={`list-view-loading ${isLoading ? 'is-active' : ''}`}>
                <HourglassEmptyIcon />&nbsp;加載中...
            </div>
            <div className={`list-view-end ${isEnd ? 'is-active' : ''}`}>
                <BlockIcon />&nbsp;完~
            </div>
        </div>
    )
}

export default ListView