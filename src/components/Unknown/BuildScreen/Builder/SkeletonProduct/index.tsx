import { Skeleton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import useStyles from './styles';

const SkeletonProduct = () => {
  const styles = useStyles();

  return (
    <Box className={styles.wrapper}>
      <Box className={styles.leftWrapper}>
        <Skeleton className={styles.image} />
        <Box>
          <Typography variant="h5">
            <Skeleton variant="text" animation="wave" height={45} />
          </Typography>
          <Box>
            {Array.from(new Array(3)).map((_, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <Box key={index} className={styles.specsWrapper}>
                <Typography variant="h6" marginRight={1}>
                  <Skeleton
                    variant="text"
                    animation="wave"
                    height={35}
                    width={100}
                  />
                </Typography>
                <Typography fontWeight="bold">
                  <Skeleton
                    variant="text"
                    animation="wave"
                    height={35}
                    width={200}
                  />
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
      <Box className={styles.rightWrapper}>
        <Typography variant="h5">
          <Skeleton variant="text" animation="wave" width={150} height={50} />
        </Typography>
        <Skeleton className={styles.button} />
      </Box>
    </Box>
  );
};

export default SkeletonProduct;
