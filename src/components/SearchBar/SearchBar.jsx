import React from "react";
import { TextField } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

const SearchBar = () => {

    const useStyles = makeStyles ({
        searchBar: {
            marginLeft:16,
        }
    });
      
    const classes = useStyles();
      
        return (
          <div className={classes.searchBar} >
              <TextField id="outlined-search" label="Search field" type="search" variant="outlined" />
          </div>
        );
      }

export default SearchBar;