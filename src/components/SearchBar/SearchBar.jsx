import React from "react";
import Input from "../Input";



const SearchBar = ({handleSearch}) => {

    const handleChange = (event) => {
        const searchTerm = event.target.value;
        handleSearch(searchTerm);
    }
      
        return (
          <div>
              <Input 
              label="Search"
              onChange={handleChange}/>
          </div>
        );
      }

export default SearchBar;