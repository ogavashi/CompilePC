import { Paper, Typography, Skeleton } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import useStyles from './styles';

type DescriptionBlockProps = {
  description: string;
  isLoading: boolean;
};

const DescriptionBlock: React.FC<DescriptionBlockProps> = ({
  description,
  isLoading,
}) => {
  const styles = useStyles();

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Description
      </Typography>
      <Paper className={styles.descriptionPaper}>
        <Typography className={styles.description} gutterBottom>
          {isLoading
            ? Array.from(new Array(8)).map((element, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <Skeleton variant="text" animation="wave" key={index} />
              ))
            : description}
        </Typography>
      </Paper>
    </Box>
  );
};

export default DescriptionBlock;
