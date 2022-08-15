import { IconButton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import useStyles from './styles';

export type BuilderProductSpec = {
  name: string;
  value: string;
};

type BuilProduct = {
  id: string;
  name: string;
  mainImage: string;
  specs: BuilderProductSpec[];
};

type ProductProps = {
  product: BuilProduct;
  handleSelect: (id: string) => void;
  selectedId: string;
};

const BuilderProduct: React.FC<ProductProps> = ({
  product,
  handleSelect,
  selectedId,
}) => {
  const styles = useStyles();

  const CheckIcon = () =>
    selectedId === product.id ? (
      <IconButton onClick={() => handleSelect('')}>
        <CloseRoundedIcon className={styles.redIcon} fontSize="large" />
      </IconButton>
    ) : (
      <IconButton onClick={() => handleSelect(product.id)}>
        <SwapHorizIcon className={styles.greenIcon} fontSize="large" />
      </IconButton>
    );

  return (
    <Box className={styles.wrapper}>
      <Box className={styles.leftWrapper}>
        <img
          className={styles.image}
          src={product.mainImage}
          alt={product.name}
        />
        <Box>
          <Typography variant="h5">{product.name}</Typography>
          <Box>
            {product.specs.map((spec) => (
              <Box key={spec.name} className={styles.specsWrapper}>
                <Typography
                  variant="h6"
                  marginRight={1}
                >{`${spec.name}: `}</Typography>
                <Typography fontWeight="bold">{spec.value}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
      <Box className={styles.rightWrapper}>
        <Typography variant="h5">~300$</Typography>
        {selectedId ? (
          <CheckIcon />
        ) : (
          <IconButton onClick={() => handleSelect(product.id)}>
            <AddRoundedIcon
              className={styles.greenIcon}
              fontSize="large"
              color="secondary"
            />
          </IconButton>
        )}
      </Box>
    </Box>
  );
};

export default BuilderProduct;
