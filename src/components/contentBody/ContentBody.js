import React, {} from 'react'
import './contentBody.scss'

const ContentBody = (props) => {
    const {
        content,
        chapterNumber,
        writer,
        showComments
    } = props
    return (
        <div className="content-body">
            <div className="content-fixed-top">
                <span>第 0 章</span>
                <span>小弟就GG</span>
            </div>
            <div className={`content-main ${!showComments ? 'is-active' : ''}`}>
                <pre
                    dangerouslySetInnerHTML={{
                        __html: content
                    }}
                />
            </div>
        </div>
    )
}

export default ContentBody