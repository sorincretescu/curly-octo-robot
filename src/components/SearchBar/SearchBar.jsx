import React from "react";
import Input from "../Input";
import { useTranslation } from 'react-i18next';




const SearchBar = (props) => {
  const { t } = useTranslation();


  return (
    <div>
      <Input
        label={t('Search')}
        {...props} />
    </div>
  );
}

export default SearchBar;