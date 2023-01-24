import React from 'react';
import { Paper, Typography, Skeleton } from '@mui/material';
import { Box } from '@mui/system';
import ReactHtmlParser from 'react-html-parser';
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

  const Description = () => {
    if (description.includes('<p>')) {
      return (
        <Box className={styles.description}>
          <span>{ReactHtmlParser(description)}</span>
        </Box>
      );
    }
    return (
      <Typography className={styles.description} gutterBottom>
        {description}
      </Typography>
    );
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Description
      </Typography>
      <Paper className={styles.descriptionPaper}>
        {isLoading ? (
          Array.from(new Array(8)).map((element, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Skeleton variant="text" animation="wave" key={index} />
          ))
        ) : (
          <Description />
        )}
      </Paper>
    </Box>
  );
};

export default DescriptionBlock;
