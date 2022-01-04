/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spiner from './Spiner';
import PropTypes from 'prop-types'

import InfiniteScroll from "react-infinite-scroll-component";


const News = (props) => {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    


    const updateNews = async () => {

        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.PageSize}`

        setLoading(true)
        let data = await fetch(url);
        props.setProgress(40);
        let ParsedData = await data.json()

        props.setProgress(80);
        setArticles(ParsedData.articles)
        setTotalResults(ParsedData.totalResults)
        setLoading(false)

        props.setProgress(100);
    }

    useEffect(() => {
        document.title = capitalizeFirstLetter(props.category) + ' - By NewsMonkey'
        updateNews()
    }, [])

    const handlePrevPage = async () => {
        setPage(page - 1)
        updateNews()
    }
    const handleNextPage = async () => {
        setPage(page + 1)
        updateNews()
    }

    const fetchMoreData = async () => {
        
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.PageSize}`
        setPage(page + 1)
        
        let data = await fetch(url);
        let ParsedData = await data.json()

        setArticles(articles.concat(ParsedData.articles))
        setTotalResults(ParsedData.totalResults)
        setLoading(false)
    }

    return (
        <div className='container my-3 mt-5 pt-3'>
            <h2 className='text-center text-capitalize my-3'>NewsMonkey - Top {props.category} Headlines</h2>

            {loading && <Spiner />}

            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spiner />}
            >
                <div className="container">
                    <div className="row">
                        {articles.map((element) => {
                            return <div className="col-md-4" key={element.url} >
                                <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage ? element.urlToImage : ""} newsUrl={element.url ? element.url : ""} author={element.author ? element.author : "Unknown"} date={element.publishedAt ? element.publishedAt : ""} source={element.source.name ? element.source.name : "Unknown"} />
                            </div>
                        })}
                    </div>
                </div>

            </InfiniteScroll>
            {/* <div className="container d-flex justify-content-between">
                    <button disabled={page <= 1} className="btn btn-dark" onClick={handlePrevPage}>&larr; Previous</button>
                    <button disabled={page + 1 > Math.ceil(totalResults / props.PageSize)} className="btn btn-dark" onClick={handleNextPage}>Next &rarr;</button>
                </div> */}
        </div>
    )
}

News.defaultProps = {
    country: 'in',
    pageSize: 6,
    category: "general"
}
News.propTypes = {
    name: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}
export default News
