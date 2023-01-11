import React from 'react';

//This is a searchbar component for out views
const SearchBar = ({input:keyword,onChange:setKeyword,value:name}) => {
  const BarStyling = {width:"20rem",background:"#F2F1F9", border:"none", padding:"0.5rem"};
  return (
    <input 
     style={BarStyling}
     key="random1"
     value={keyword}
     placeholder={"search " + name}
     onChange={(e) => setKeyword(e.target.value)}
    />
  );
}

export default SearchBar