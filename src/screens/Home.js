import React, { useState, useEffect, useCallback } from 'react'
import 'assets/home.scss'
import { useSelector, useDispatch } from 'react-redux'
import ListView from 'components/listView/ListView'
import Card from 'components/card/Card'
import helpers from 'helpers/helpers'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { IconButton } from '@material-ui/core'
import { toggleIsView } from 'redux/actions/app'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Button from '@material-ui/core/Button'
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import BookmarkBorderOutlinedIcon from '@material-ui/icons/BookmarkBorderOutlined';
import ContentBody from 'components/contentBody/ContentBody'
import api from 'api/api'

const Home = () => {
    const appState = useSelector(state => state.appReducer)
    const { isViewListPanel, isViewContentPanel } = appState
    const dispatch = useDispatch()
    const [chapterInView, setchapterInView] = useState({
        id: null,
        title: ''
    })
    const [storyPage, setStoryPage] = useState(0)
    const [isFetchingStory, setFetchingStory] = useState(false)
    const [isEndFetch, setEndFetch] = useState(false)
    const [stories, setStories] = useState([])
    const scrollEndCallback = () => {
        console.log('page number: ', storyPage)
        if (isEndFetch) return
        setStoryPage(prev => ++prev)
    }
    const onClickSetChapterInView = useCallback((story) => {
        setchapterInView(prev => prev.id !== story.id ? {id: story.id, title: story.title} : prev)
        // setchapterInView({
        //     id: story.id,
        //     title: story.title
        // })
        if (helpers.isSm()) {
            dispatch(toggleIsView(false))
        }
    }, [dispatch])
    const appendCardsIntoList = (res, cardOnClick) => {
        const cardList = []
        res.forEach(story => {
            cardList.push(
                <Card
                    key={story.id}
                    story={story}
                    onClick={cardOnClick}
                />
            )
        })
        setStories(old => old.concat(cardList))
    }
    useEffect(() => {
        setFetchingStory(true)
        const url = api.domain + `/stories`
        const successCallback = function(json) {
            console.log(json)
            if (json.result && json.result.length > 0) {
                appendCardsIntoList(json.result, onClickSetChapterInView)  
            } else {
                setEndFetch(true)
            }
            setFetchingStory(false)
        }
        api.getRequest(url, {page: storyPage}, {}, successCallback)
        /*
        fetch(`${api.domain}/stories?page=${storyPage}`)
        .then(res => res.json())
        .then(json => {
            if (json.result && json.result.length > 0) {
                appendCardsIntoList(json.result, onClickSetChapterInView)  
            } else {
                setEndFetch(true)
            }
            setFetchingStory(false)
        })*/
    }, [onClickSetChapterInView, storyPage, setEndFetch])
    const [showComments, setShowComments] = useState(false)
    return (
        <div className={`section-home container`}>
            <div className="columns">
                <div className={`list-panel ${isViewListPanel ? 'is-active' : ''}`}>
                    <div className="list-panel-header">
                        {
                            isViewListPanel &&
                            <IconButton
                                onClick={() => dispatch(toggleIsView(false))}
                            >
                                <ArrowBackIosIcon />
                            </IconButton>
                        }
                    </div>
                    <div className="list-panel-body">
                        <ListView
                            items={stories}
                            isEnd={isEndFetch}
                            isLoading={isFetchingStory}
                            scrollEndCallback={scrollEndCallback}
                        />
                    </div>
                </div>
                <div className={`content-panel ${isViewContentPanel ? 'is-active' : ''}`}>
                    <div className="content-panel-header">
                        {
                            !isViewListPanel &&
                            <IconButton
                                onClick={() => dispatch(toggleIsView(true))}
                            >
                                <ArrowForwardIosIcon />
                            </IconButton>
                        }
                        {
                            <div className="content-panel-header-title">{chapterInView.title}</div>
                        }
                        <div className="content-panel-header-likes">
                            <IconButton>
                                <FavoriteBorderOutlinedIcon />
                            </IconButton>
                            <IconButton>
                                <ThumbUpAltOutlinedIcon />
                            </IconButton>
                            <IconButton>
                                <BookmarkBorderOutlinedIcon />
                            </IconButton>
                        </div>
                    </div>
                    <div className="content-panel-top">
                        <div className={`content-panel-body ${!showComments ? 'is-active' : ''}`}>
                            <ContentBody
                                showComments={showComments} 
                                chapterInView={chapterInView}
                            />
                        </div>
                        <div className="content-panel-controller">
                            <Button>下一章</Button>
                            <Button>分流</Button>
                            <Button>評分</Button>
                        </div>
                    </div>
                    <div className={`content-panel-bottom ${showComments ? 'is-active' : ''}`}>
                        <div className="content-panel-bottom-header">
                            {
                                showComments ?
                                    <IconButton
                                        onClick={() => setShowComments(false)}
                                    >
                                        <KeyboardArrowDownIcon />
                                    </IconButton>
                                    :
                                    <IconButton
                                        onClick={() => setShowComments(true)}
                                    >
                                        <KeyboardArrowUpIcon />
                                    </IconButton>
                            }
                            &nbsp;&nbsp;討論區
                        </div>
                        <div className="content-panel-bottom-body">

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home