import React, { useState, useEffect } from 'react';
import { InputBase, IconButton, Box, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CancelIcon from '@mui/icons-material/Cancel';
import { useNavigate } from 'react-router-dom';
import { client } from '../../api/client';

interface SearchBoxProps {
  initialValue?: string;
  onSearch?: (query: string) => void;
}

const SearchBox = ({ initialValue = '', onSearch }: SearchBoxProps) => {
  const [inputValue, setInputValue] = useState<string>(initialValue);
  const [, setOptions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (inputValue === '') {
      setOptions([]);
      return;
    }

    if (inputValue.startsWith('#')) {
      // Hashtag search
      client
        .get(`/hashtags/${inputValue.slice(1)}/posts`)
        .then((response) => {
          setOptions(response.data);
        })
        .catch((error) => {
          console.log('Error fetching hashtags', error);
        });
    } else {
      // General keyword search
      client
        .get(`/searches?q=${inputValue}`)
        .then((response) => {
          setOptions(response.data);
        })
        .catch((error) => {
          console.log('Error fetching searches', error);
        });
    }
  }, [inputValue]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() !== '') {
      onSearch?.(inputValue.trim());
      navigate(`/searches/${encodeURIComponent(inputValue.trim())}`);
    }
    setInputValue('');
  };

  const handleClear = () => {
    setInputValue('');
  };

  return (
    <Box sx={{ mt: 2, mx: 2 }}>
      <Paper
        component="form"
        onSubmit={handleSearch}
        variant="outlined"
        sx={{
          boxShadow: 'none',
          borderRadius: '9999px',
          display: 'flex',
          justifyContent: 'space-between',
          pl: 2,
        }}
      >
        <InputBase
          placeholder="キーワードを入力してください"
          inputProps={{ 'aria-label': 'search' }}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <IconButton type="submit" aria-label="search">
          {inputValue ? <CancelIcon onClick={handleClear} /> : <SearchIcon />}
        </IconButton>
      </Paper>
    </Box>
  );
};

export default SearchBox;
