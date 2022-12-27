import React from 'react';
import { Box } from '@mui/system';
import Button from '@mui/material/Button/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { CategoryName } from '../../../../types';
import BuildProduct from './BuildProduct';
import { ProductCategories } from '../../../common/constants';
import useStyles from './styles';
import useBuild from '../../../hooks/useBuild';

const Build = () => {
  const styles = useStyles();

  const { clearBuild, getAverageSum, isEmpty } = useBuild();

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
        <Typography className={styles.totalSum}>{getAverageSum()} ₴</Typography>
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
          disabled={isEmpty}
        >
          Save
        </Button>
        <Button
          color="secondary"
          variant="outlined"
          fullWidth
          className={styles.button}
          onClick={() => clearBuild()}
          disabled={isEmpty}
        >
          Clear
        </Button>
      </Box>
    </Box>
  );
};

export default Build;
