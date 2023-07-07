import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Input from "../Input/Input";

const useStyles = makeStyles ({
    searchBar: {
        marginLeft:16,
    }
});

const SearchBar = ({handleSearch}) => {

    const handleChange = (event) => {
        const searchTerm = event.target.value;
        handleSearch(searchTerm)
    }

    const classes = useStyles();
      
        return (
        
          <div className={classes.searchBar} >
              <Input 
              label="Search"
              onChange={handleChange}/>
            
          </div>
        );
      }

export default SearchBar;