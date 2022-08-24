import React from 'react';
import { InputAdornment, TextField } from '@mui/material';
import { SearchIcon } from '../Icons';
import useStyles from './styles';

const Search: React.FC = () => {
  const styles = useStyles();

  return (
    <TextField
      className={styles.searchField}
      placeholder="Search or type"
      size="small"
      fullWidth
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default Search;
