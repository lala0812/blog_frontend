import React from 'react';

const SearchContext = React.createContext({
  searchQuery: '',
  setSearchQuery: () => {}
});

export default SearchContext;
