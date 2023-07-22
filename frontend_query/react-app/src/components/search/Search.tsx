import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Grid, Box } from '@mui/material';
import SearchBox from 'components/common/SearchBox';
import SearchList from './SearchList';

import { useSearches } from 'hooks/search/useSearches';
import LoadingAndErrorComponent from 'components/utils/LoadingAndErrorComponent';
import { type User, type Post } from 'interfaces';

const Search = () => {
  const { query: urlQuery } = useParams<{ query: string }>();
  const [searchQuery, setSearchQuery] = useState<string>(
    urlQuery ? decodeURIComponent(urlQuery) : ''
  );
  const location = useLocation();

  console.log('query', urlQuery);
  console.log('searchQuery', searchQuery);
  console.log(location);
  console.log('location.pathname', location.pathname);

  const { users, posts, isLoading, error } = useSearches(searchQuery);

  useEffect(() => {
    if (urlQuery) {
      setSearchQuery(decodeURIComponent(urlQuery));
    }
  }, [urlQuery]);

  const handleSearch = (newQuery: string) => {
    setSearchQuery(newQuery);
  };

  return (
    <LoadingAndErrorComponent isLoading={isLoading} error={error}>
      <Grid
        container
        direction="column"
        spacing={1}
        justifyContent="center"
        alignItems="center"
      >
        <Box
          sx={{
            position: 'sticky',
            top: 0,
            zIndex: 10,
            backgroundColor: 'white',
            width: '100%',
          }}
        >
          <Grid
            item
            mobile={12}
            sx={{
              width: '600px',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <SearchBox initialValue={searchQuery} onSearch={handleSearch} />
          </Grid>
        </Box>
        <Grid item mobile={12}>
          <SearchList users={users as User[]} posts={posts as Post[]} />
        </Grid>
      </Grid>
    </LoadingAndErrorComponent>
  );
};

export default Search;
