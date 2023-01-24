import React from 'react';
import { Box } from '@mui/system';
import { Link, generatePath } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { Assembly, CategoryName } from '../../../../../types';
import { IconByCategory, ROUTES } from '../../../../common/constants';
import useStyles from './styles';

type ShortSpecsProps = {
  assembly: Assembly;
};

const ShortSpecs: React.FC<ShortSpecsProps> = ({ assembly }) => {
  const styles = useStyles();

  return (
    <Box className={styles.wrapper}>
      {Object.keys(assembly).map((key) => {
        const category = key as CategoryName;
        const Icon = IconByCategory[category];
        const part = assembly[category];

        return (
          <Box key={category}>
            <Link
              style={{ textDecoration: 'none' }}
              to={generatePath(ROUTES.PRODUCT, { id: part?.id, category })}
            >
              <Box className={styles.spec}>
                <Icon />
                <Typography className={styles.productName}>
                  {part?.name}
                </Typography>
              </Box>
            </Link>
          </Box>
        );
      })}
    </Box>
  );
};

export default ShortSpecs;
