import { Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import useStyles from './styles';

type DescriptionBlockProps = {
  description: string;
};

const DescriptionBlock: React.FC<DescriptionBlockProps> = ({ description }) => {
  const styles = useStyles();

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Description
      </Typography>
      <Paper>
        <Typography className={styles.description} gutterBottom>
          {description}
        </Typography>
      </Paper>
    </Box>
  );
};

export default DescriptionBlock;
