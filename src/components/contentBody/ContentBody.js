import React, { useState, useEffect, useCallback } from 'react'
import './contentBody.scss'

const ContentBody = (props) => {
    const {
        chapterInView,
        showComments,
    } = props
    const [chapter, setChapter] = useState({})
    const fetchChapter = useCallback(() => {
        if (!chapterInView.id) return
        fetch(`http://localhost:8080/chapters?storyId=${chapterInView.id}`)
        .then(res => res.json())
        .then(json => {
            storeResult(json.result)
        })
    }, [chapterInView])
    const storeResult = (res) => {
        setChapter(res[0])
    }
    useEffect(() => {
        fetchChapter()
    }, [chapterInView, fetchChapter])
    return (
        <div className="content-body">
            <div className="content-fixed-top">
                {
                    chapter && (<>
                    <span>第 {chapter.chapter_number} 章</span>
                    <span>{chapter.writer}</span>
                    </>)
                }
            </div>
            <div className={`content-main ${!showComments ? 'is-active' : ''}`}>
                <pre
                    dangerouslySetInnerHTML={{
                        __html: chapter && chapter.content ? chapter.content : ''
                    }}
                />
            </div>
        </div>
    )
}

export default ContentBody