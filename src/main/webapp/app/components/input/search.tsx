import React from 'react';
import './input.scss';

// material imports
import SearchIcon from '@material-ui/icons/Search';

export default function Search({ placeholder }) {
  return (
    <div className="search">
      <SearchIcon />
      <input type="text" placeholder={placeholder} className="search__box" />
    </div>
  );
}
