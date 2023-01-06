import { TextField } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { Box } from '@mui/system';
import React, { useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button/Button';
import IconButton from '@mui/material/IconButton/IconButton';
import { Builder } from '../../../../../../types';
import useStyles from './styles';
import {
  selectFilter,
  selectOpenedBuilder,
} from '../../../../../store/builder/selectors';
import { setSearch } from '../../../../../store/builder/slice';

type SearchBarProps = {
  builder: Builder;
};

const SearchBar: React.FC<SearchBarProps> = ({ builder }) => {
  const styles = useStyles();

  const dispatch = useDispatch();

  const openedBuilder = useSelector(selectOpenedBuilder);

  const savedFilter = useSelector(selectFilter(openedBuilder));

  const [searchValue, setSearchValue] = useState<string>(
    (savedFilter?.searchValue as string) || '',
  );

  const searchLabel = useMemo(
    () => `Search ${builder.categoryName}`,
    [builder.categoryName],
  );

  const showClearIcon = useCallback(
    () => searchValue.length,
    [searchValue.length],
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(event.target.value);
  };

  const handleClear = useCallback(() => {
    dispatch(setSearch({ category: builder.categoryName, value: '' }));
  }, [builder.categoryName, dispatch]);

  const addSearch = useCallback(() => {
    dispatch(setSearch({ category: builder.categoryName, value: searchValue }));
  }, [builder.categoryName, dispatch, searchValue]);

  const handleEnter = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter')
        dispatch(
          setSearch({ category: builder.categoryName, value: searchValue }),
        );
    },
    [builder.categoryName, dispatch, searchValue],
  );

  const handleSearch = useCallback(() => addSearch(), [addSearch]);

  return (
    <Box display="flex" justifyContent="center" marginBottom={5}>
      <TextField
        color="secondary"
        placeholder={searchLabel}
        value={searchValue}
        onChange={handleChange}
        onKeyDown={handleEnter}
        className={styles.search}
        autoComplete="off"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon className={styles.icon} />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment
              position="end"
              style={{ display: showClearIcon() ? 'flex' : 'none' }}
              onClick={() => {}}
            >
              <IconButton onClick={handleClear}>
                <ClearIcon className={styles.icon} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Button
        onClick={handleSearch}
        color="secondary"
        variant="outlined"
        className={styles.button}
      >
        <SearchIcon />
      </Button>
    </Box>
  );
};

export default SearchBar;
