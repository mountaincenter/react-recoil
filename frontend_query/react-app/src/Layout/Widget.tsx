import React, { useState } from 'react';
import { InputBase, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/search';
import { useSearches } from 'hooks/search/useSearches';
import LoadingAndErrorComponent from 'components/utils/LoadingAndErrorComponent';

const Widget = () => {
  const [query, setQuery] = useState<string>('');
  const { searches, isLoading, error } = useSearches(query);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(searches);
  };
  return (
    <LoadingAndErrorComponent isLoading={isLoading} error={error}>
      <form onSubmit={handleSearch}>
        <InputBase
          placeholder="キーワードを入力してください"
          inputProps={{ 'aria-label': 'search' }}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <IconButton type="submit" aria-label="search">
          <SearchIcon />
        </IconButton>
      </form>
    </LoadingAndErrorComponent>
  );
};

export default Widget;
