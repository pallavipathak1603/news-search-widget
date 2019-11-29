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
            initialResult:[],
            queryParam:""
        }
    }

    componentDidMount = () => {
        if(this.props.query){
            console.log("Props has query: " + this.props.query);
            this.handleUrlQueryParam()
        }
    }

    refreshResult = () => {
        let page = 1;
        let queryPrefix = this.state.queryParam;
        if(queryPrefix.length >= 3){
            axios.get(`${API_URL}?q=${queryPrefix}&apiKey=${API_KEY}&pageSize=${10}&page=${page}`)
            .then(({ data }) => {
                this.setState({
                    initialResult: data.articles,
                })
                clearInterval(this.intervalID)
                console.log("clearing interval!! " + this.intervalID);
                this.intervalID = setInterval(this.refreshResult, 30000)
                console.log("setting interval " + this.intervalID)
            })
        }else{
            clearInterval(this.intervalID)
            console.log("clearing interval!! " + this.intervalID);
        }
    }

    handleOnChange =(ev) =>{
        let queryParam = ev.target.value;
        this.setState({
            queryParam: queryParam
        },()=>{
            this.refreshResult();
        })
    }

    handleUrlQueryParam = () => {
        if(this.props.query.length >= 3){
            this.setState({
                queryParam: this.props.query
            },()=>{
                this.refreshResult();
            })
        }
    }

    render(){
        const result = this.state.initialResult;
        
        return(
            <div id="search-page">
                <div className="searchbar"> <span id="timer">{this.state.timer}</span>
                <input className="search-input" type="text" placeholder="Type something to search .." onChange={this.handleOnChange}/>
                </div>
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
           
        )}
}
  
export default SearchComponent;
