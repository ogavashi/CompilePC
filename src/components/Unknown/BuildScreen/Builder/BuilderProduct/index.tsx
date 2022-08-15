import { IconButton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import AddBoxIcon from '@mui/icons-material/AddBox';
import useStyles from './styles';

export type BuilderProductSpecs = {
  name: string;
  value: string;
};

type ProductProps = {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
  specs: BuilderProductSpecs[];
};

const BuilderProduct: React.FC<ProductProps> = ({
  id,
  title,
  imageUrl,
  price,
  specs,
}) => {
  const styles = useStyles();
  return (
    <Box className={styles.wrapper}>
      <Box className={styles.leftWrapper}>
        <img className={styles.image} src={imageUrl} alt={title} />
        <Box>
          <Typography fontWeight={600} variant="h5">
            {title}
          </Typography>
          <Box>
            {specs.map((spec) => (
              <Box key={spec.name} className={styles.specsWrapper}>
                <Typography paddingRight={1}>{`${spec.name}: `}</Typography>
                <Typography fontWeight={600}>{spec.value}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
      <Box className={styles.rightWrapper}>
        <Typography variant="h4">~{price}$</Typography>
        <IconButton>
          <AddBoxIcon color="secondary" />
        </IconButton>
      </Box>
    </Box>
  );
};

export default BuilderProduct;
