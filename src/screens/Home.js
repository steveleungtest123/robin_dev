import React, { useState, useEffect } from 'react'
import 'assets/screens.scss'
import { useSelector, useDispatch } from 'react-redux'
import ListView from 'components/listView/ListView'
import Card from 'components/card/Card'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { IconButton } from '@material-ui/core'
import { toggleIsView } from 'redux/actions/app'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Button from '@material-ui/core/Button'
import AllOutIcon from '@material-ui/icons/AllOut';
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import BookmarkBorderOutlinedIcon from '@material-ui/icons/BookmarkBorderOutlined';
import ContentBody from 'components/contentBody/ContentBody'

const Home = () => {
    const appState = useSelector(state => state.appReducer)
    const { isViewListPanel, isViewContentPanel } = appState
    const dispatch = useDispatch()
    const [isExpandAll, setExpandAll] = useState(false)
    const [chapterInView, setchapterInView] = useState({
        title: "涼生，我們可不以不悲哀"
    })
    const [stories, setStories] = useState([
        <Card
            title="你好嗎"
            writer="steve"
            expandAll={isExpandAll}
            description="<p>一個農民從洪水中救起了他的妻子，他的孩子卻被淹死了。事後，人們議論紛紛。有的說他做得對，因為孩子可以再生一個，妻子卻不能死而復活;有的說他做錯了，因為妻子可以另娶一個，孩子卻不能死而復活。我聽了人們的議論，也感到疑惑難決：如果只能救活一人，究竟應該救妻子呢，還是救孩子?

            於是我去拜訪那個農民，問他當時是怎麼想的。他答道：「我什麼也沒想。洪水襲來，妻子在我身過，我抓住她就往附近的山坡游。當我返回時，孩子已經被洪水沖走了」。</p>"
        />
    ])
    const scrollEndCallback = () => {
        console.log('it is end')
    }
    useEffect(() => {
        setStories([
            <Card
                title="涼生，我們可不以不悲哀"
                writer="steve"
                expandAll={isExpandAll}
                description="<p>一個農民從洪水中救起了他的妻子，他的孩子卻被淹死了。事後，人們議論紛紛。有的說他做得對，因為孩子可以再生一個，妻子卻不能死而復活;有的說他做錯了，因為妻子可以另娶一個，孩子卻不能死而復活。我聽了人們的議論，也感到疑惑難決：如果只能救活一人，究竟應該救妻子呢，還是救孩子?
    
                於是我去拜訪那個農民，問他當時是怎麼想的。他答道：「我什麼也沒想。洪水襲來，妻子在我身過，我抓住她就往附近的山坡游。當我返回時，孩子已經被洪水沖走了」。</p>"
            />
        ])
    }, [isExpandAll])
    const [showComments, setShowComments] = useState(true)
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
                        <IconButton
                            onClick={() => setExpandAll(!isExpandAll)}
                        >
                            <AllOutIcon />
                        </IconButton>
                    </div>
                    <div className="list-panel-body">
                        <ListView
                            items={stories}
                            isEnd={true}
                            isLoading={true}
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
                            chapterInView && chapterInView.title && <div className="content-panel-header-title">{chapterInView.title}</div>
                        }
                        <div className="content-panel-header-likes">
                            <IconButton>
                                <FavoriteOutlinedIcon />
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
                                content="<p>一個農民從洪水中救起了他的妻子，他的孩子卻被淹死了。事後，人們議論紛紛。有的說他做得對，因為孩子可以再生一個，妻子卻不能死而復活;有的說他做錯了，因為妻子可以另娶一個，孩子卻不能死而復活。我聽了人們的議論，也感到疑惑難決：如果只能救活一人，究竟應該救妻子呢，還是救孩子?
    
                                於是我去拜訪那個農民，問他當時是怎麼想的。他答道：「我什麼也沒想。洪水襲來，妻子在我身過，我抓住她就往附近的山坡游。當我返回時，孩子已經被洪水沖走了」。</p><p>一個農民從洪水中救起了他的妻子，他的孩子卻被淹死了。事後，人們議論紛紛。有的說他做得對，因為孩子可以再生一個，妻子卻不能死而復活;有的說他做錯了，因為妻子可以另娶一個，孩子卻不能死而復活。我聽了人們的議論，也感到疑惑難決：如果只能救活一人，究竟應該救妻子呢，還是救孩子?
    
                                於是我去拜訪那個農民，問他當時是怎麼想的。他答道：「我什麼也沒想。洪水襲來，妻子在我身過，我抓住她就往附近的山坡游。當我返回時，孩子已經被洪水沖走了」。</p>
                                <p>一個農民從洪水中救起了他的妻子，他的孩子卻被淹死了。事後，人們議論紛紛。有的說他做得對，因為孩子可以再生一個，妻子卻不能死而復活;有的說他做錯了，因為妻子可以另娶一個，孩子卻不能死而復活。我聽了人們的議論，也感到疑惑難決：如果只能救活一人，究竟應該救妻子呢，還是救孩子?
    
                                於是我去拜訪那個農民，問他當時是怎麼想的。他答道：「我什麼也沒想。洪水襲來，妻子在我身過，我抓住她就往附近的山坡游。當我返回時，孩子已經被洪水沖走了」。</p>
                                <p>一個農民從洪水中救起了他的妻子，他的孩子卻被淹死了。事後，人們議論紛紛。有的說他做得對，因為孩子可以再生一個，妻子卻不能死而復活;有的說他做錯了，因為妻子可以另娶一個，孩子卻不能死而復活。我聽了人們的議論，也感到疑惑難決：如果只能救活一人，究竟應該救妻子呢，還是救孩子?
    
                                於是我去拜訪那個農民，問他當時是怎麼想的。他答道：「我什麼也沒想。洪水襲來，妻子在我身過，我抓住她就往附近的山坡游。當我返回時，孩子已經被洪水沖走了」。</p>
                                <p>一個農民從洪水中救起了他的妻子，他的孩子卻被淹死了。事後，人們議論紛紛。有的說他做得對，因為孩子可以再生一個，妻子卻不能死而復活;有的說他做錯了，因為妻子可以另娶一個，孩子卻不能死而復活。我聽了人們的議論，也感到疑惑難決：如果只能救活一人，究竟應該救妻子呢，還是救孩子?
    
                                於是我去拜訪那個農民，問他當時是怎麼想的。他答道：「我什麼也沒想。洪水襲來，妻子在我身過，我抓住她就往附近的山坡游。當我返回時，孩子已經被洪水沖走了」。</p>
                                <p>一個農民從洪水中救起了他的妻子，他的孩子卻被淹死了。事後，人們議論紛紛。有的說他做得對，因為孩子可以再生一個，妻子卻不能死而復活;有的說他做錯了，因為妻子可以另娶一個，孩子卻不能死而復活。我聽了人們的議論，也感到疑惑難決：如果只能救活一人，究竟應該救妻子呢，還是救孩子?
    
                                於是我去拜訪那個農民，問他當時是怎麼想的。他答道：「我什麼也沒想。洪水襲來，妻子在我身過，我抓住她就往附近的山坡游。當我返回時，孩子已經被洪水沖走了」。</p>"
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