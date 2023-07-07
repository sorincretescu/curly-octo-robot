import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Input from "../Input/Input";



const SearchBar = ({handleSearch}) => {

    const handleChange = (event) => {
        const searchTerm = event.target.value;
        handleSearch(searchTerm)
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