import React, { useContext } from 'react';
import { Box } from '@mui/system';
import Button from '@mui/material/Button/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { AppContext } from '../../AppContext';
import { CategoryName } from '../../../../types';
import BuildProduct from './BuildProduct';
import { ProductCategories } from '../../../common/constants';
import useStyles from './styles';

const Build = () => {
  const styles = useStyles();

  const { clearBuild, build } = useContext(AppContext);

  const minPrice = Object.keys(build).reduce((sum, key) => {
    const part = build[key as CategoryName];
    return part ? sum + part.price.range.minPrice : 0;
  }, 0);

  const maxPrice = Object.keys(build).reduce((sum, key) => {
    const part = build[key as CategoryName];
    return part ? sum + part.price.range.maxPrice : 0;
  }, 0);

  const avaragePrice = (maxPrice + minPrice) / 2;

  return (
    <Box className={styles.wrapper}>
      {Object.keys(ProductCategories).map((category) => (
        <BuildProduct
          category={ProductCategories[category as CategoryName].categoryName}
          key={category}
        />
      ))}
      <Box className={styles.totalWrapper}>
        <Typography className={styles.totalTitle}>Total:</Typography>
        <Typography className={styles.totalSum}>{avaragePrice} ₴</Typography>
      </Box>
      <Divider
        className={styles.divider}
        orientation="horizontal"
        variant="middle"
      />
      <Box display="flex" flexDirection="row">
        <Button
          color="secondary"
          variant="contained"
          fullWidth
          className={styles.button}
        >
          Save
        </Button>
        <Button
          color="secondary"
          variant="outlined"
          fullWidth
          className={styles.button}
          onClick={() => clearBuild()}
        >
          Clear
        </Button>
      </Box>
    </Box>
  );
};

export default Build;
