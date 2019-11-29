import React,{Component} from 'react';

class SearchResultComponent extends Component{

    handleClickCard  = () => {
        window.open(this.props.url, "_blank")
    }
    render(){
        return(
              <div className="card" onClick={this.handleClickCard}>
                <img className="image" src={this.props.urlToImage} alt="react logo"></img>
                <div className="card-body">
                        <ul className="card-list">
                                <li><span className="card-item-key">Author: </span><span>{this.props.author}</span></li>
                                <li><span className="card-item-key">Title: </span><span>{this.props.title}</span></li>
                                <li><span className="card-item-key">Description: </span><span>{this.props.description}</span></li>
                        </ul>    
                </div>
           </div>
        )}  
}
export default SearchResultComponent