import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spiner from './Spiner';
import PropTypes from 'prop-types'

import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 6,
        category: "general"
    }
    static propTypes = {
        name: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0
        }
        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
        document.title = capitalizeFirstLetter(this.props.category) + ' - By NewsMonkey'
    }

    async updateNews() {
        this.props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.PageSize}`
        
        this.setState({ loading: true })
        let data = await fetch(url);
        this.props.setProgress(40);
        let ParsedData = await data.json()
        
        this.props.setProgress(80);
        this.setState({
            articles: ParsedData.articles,
            totalResults: ParsedData.totalResults,
            loading: false
        })
        this.props.setProgress(100);
    }
    
    async componentDidMount() {
        this.updateNews()
    }

    handlePrevPage = async () => {
        this.setState({ page: this.state.page - 1 })
        this.updateNews()
    }
    handleNextPage = async () => {
        this.setState({ page: this.state.page + 1 })
        this.updateNews()
    }

     fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 })

        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.PageSize}`

        let data = await fetch(url);
        let ParsedData = await data.json()

        this.setState({
            articles: this.state.articles.concat(ParsedData.articles),
            totalResults: ParsedData.totalResults,
            loading: false
        })
        console.log(ParsedData);
    }

    render() {
        return (
            <div className='container my-3'>
                <h2 className='text-center text-capitalize my-4'>NewsMonkey - Top {this.props.category} Headlines</h2>

                {this.state.loading && <Spiner />}

                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spiner />}
                >
                    <div className="container">
                        <div className="row">
                            {this.state.articles.map((element) => {
                                return <div className="col-md-4" key={element.url} >
                                    <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage ? element.urlToImage : ""} newsUrl={element.url ? element.url : ""} author={element.author ? element.author : "Unknown"} date={element.publishedAt ? element.publishedAt : ""} source={element.source.name ? element.source.name : "Unknown"} />
                                </div>
                            })}
                        </div>
                    </div>

                </InfiniteScroll>
                {/* <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} className="btn btn-dark" onClick={this.handlePrevPage}>&larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.PageSize)} className="btn btn-dark" onClick={this.handleNextPage}>Next &rarr;</button>
                </div> */}
            </div>
        )
    }
}

export default News
