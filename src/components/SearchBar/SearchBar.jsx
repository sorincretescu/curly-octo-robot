import React from "react";
import Input from "../Input";



const SearchBar = (props) => {

        return (
          <div>
              <Input 
              label="Search"
              {...props}/>
          </div>
        );
      }

export default SearchBar;