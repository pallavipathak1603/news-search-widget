import React from 'react';
import './App.css';
import SearchComponent from './search-widget/SearchComponent';
const queryString = require('query-string');

function App() {
  let queryParamInUrl = null;
  const parsed = queryString.parseUrl(window.location.href);
  console.log(parsed)
  if(parsed.query && parsed.query.query !== undefined){
      queryParamInUrl = parsed.query.query;
  }
  return (
    
    <div className="App">
     
       <SearchComponent
        query={queryParamInUrl}
       />
      
    </div>
  );
}

export default App;
