import React,{Component} from 'react';
import SearchResultComponent from './SearchResultComponent'
import axios from 'axios';

import '../App.css';


const  API_KEY  = "363d26dd3d664d199ca63adc371e22aa"
const API_URL = 'https://newsapi.org/v2/everything'


class SearchComponent extends Component {
    constructor(props){
        super(props);
        this.state={
            totalResults:null,
            page:1,
            fetchedArticles: 0,
            articles:[],
            queryParam:"",
            timer:30
        }
    }

    componentDidMount = () => {
        if(this.props.query){
            this.handleUrlQueryParam()
        }
        let self = this;
        let articleList = document.getElementById("articles") 
        articleList.addEventListener('scroll', function() {
            if (self.state.articles.length < self.state.totalResults && articleList.scrollTop + articleList.clientHeight >= articleList.scrollHeight) {
                let page = self.state.page + 1;
                self.setState({
                    page: page
                })
                self.refreshResult(true);
            }
        });
    }
    setTimer = () => {
        let timer = this.state.timer -1;
        this.setState({
            timer:timer
        })
    }
    refreshResult = (loadMore) => {
        let queryPrefix = this.state.queryParam;
        if(queryPrefix.length >= 3){
            axios.get(`${API_URL}?q=${queryPrefix}&apiKey=${API_KEY}&pageSize=${10}&page=${this.state.page}`)
            .then(({ data }) => {
                console.log(data)
                if(loadMore) {
                    let articles = this.state.articles;
                    articles.push(...data.articles);
                    this.setState({
                        articles: articles,
                        timer: 30,
                    })
                } else {
                    this.setState({
                        page:1,
                        totalResults: data.totalResults,
                        articles: data.articles,
                        timer: 30,
                    })
                }
                clearInterval(this.intervalID);
                // console.log("clearing refresh interval!! " + this.intervalID);

                clearInterval(this.timerID);
                // console.log("clearing timer interval!! " + this.intervalID);

                this.intervalID = setInterval(this.refreshResult, 30000)
                this.timerID = setInterval(this.setTimer,1000)
                // console.log("setting refresh and timer interval " + this.intervalID)
            })
        }else{
            this.setState({
                page:1,
                totalResults:null,
                articles:[]
            })
            clearInterval(this.timerID);
            clearInterval(this.intervalID)
            // console.log("clearing both intervals!! " + this.intervalID + " " + this.timerID);
        }
    }

    handleOnChange =(ev) =>{
        let queryParam = ev.target.value;
        this.setState({
            page:1,
            queryParam: queryParam,
        },()=>{
            this.refreshResult(false);
        })
    }

    handleUrlQueryParam = () => {
        if(this.props.query.length >= 3){
            this.setState({
                page:1,
                queryParam: this.props.query,
            },()=>{
                this.refreshResult(false);
            })
        }
    }

    render(){
        const result = this.state.articles;
        
        return(
            <div id="search-page">
                <div className="searchbar"> {this.state.articles.length > 0 && <span id="timer">Auto refreshing in: {this.state.timer}</span>}
                    <input className="search-input" type="text" placeholder="Type something to search .." onChange={this.handleOnChange}/>
                </div>
                <div id="articles">
                    {
                        result.length > 0 &&
                        result.map((res,key) => {
                        return <SearchResultComponent key={key}
                        author={res.author}
                        title={res.title}
                        description={res.description}
                        urlToImage={res.urlToImage}
                        url={res.url}
                        />
                        })
                    }
                </div>               
            </div>   
    )}
}
  
export default SearchComponent;
