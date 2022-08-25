import React from 'react';
import { InputAdornment, TextField } from '@mui/material';
import { SearchIcon } from '../Icons';
import useStyles from './styles';

type SearchProps = {
  handleChange: () => void;
};

const Search: React.FC<SearchProps> = ({ handleChange }) => {
  const styles = useStyles();

  return (
    <TextField
      variant="standard"
      size="small"
      placeholder="Search or type"
      fullWidth
      className={styles.searchField}
      onChange={handleChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
        disableUnderline: true,
      }}
    />
  );
};

export default Search;
