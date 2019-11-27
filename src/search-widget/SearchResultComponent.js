import React,{Component} from 'react';

class SearchResultComponent extends Component{
    render(){
        return(
              <div className="card">
               <img className="image" src={this.props.urlToImage} alt="react logo"></img>
               <div className="card-body">
                    <b>Author:</b>  {this.props.author}<br/>
                    <b>Title:</b>  {this.props.title}<br/>
                    <b>Description:</b> {this.props.description}
               </div>
           </div>
        )}  
}
export default SearchResultComponent