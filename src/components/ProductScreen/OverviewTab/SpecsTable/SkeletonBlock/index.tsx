/* eslint-disable react/no-array-index-key */
import { Skeleton, Box } from '@mui/material';
import React from 'react';

const SkeletonBlock = () => {
  return (
    <>
      {Array.from(new Array(6)).map((element, index) => (
        <Box sx={{ width: `47% ` }} key={index}>
          <Skeleton
            key={index}
            width="42%"
            height={60}
            variant="text"
            animation="wave"
          />
          {Array.from(new Array(5)).map((_, i) => (
            <Skeleton
              key={i}
              width="100%"
              height={40}
              variant="text"
              animation="wave"
            />
          ))}
        </Box>
      ))}
    </>
  );
};
export default SkeletonBlock;
