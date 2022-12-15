import { IconButton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import useStyles from './styles';
import { CategoryName, Part } from '../../../../../types';
import getShortSpecs from '../ShortSpecs/getShortSpecs';

type ProductProps = {
  product: Part;
  handleSelect: (id: string) => void;
  selectedId: string;
  category: CategoryName;
};

const BuilderProduct: React.FC<ProductProps> = ({
  product,
  handleSelect,
  selectedId,
  category,
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

  const specs = getShortSpecs(product, category);

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
            {specs?.map(
              (spec) =>
                spec.value && (
                  <Box key={spec.name} className={styles.specsWrapper}>
                    <Typography
                      variant="h6"
                      marginRight={1}
                    >{`${spec.name}: `}</Typography>
                    <Typography fontWeight="bold">{spec.value}</Typography>
                  </Box>
                ),
            )}
          </Box>
        </Box>
      </Box>
      <Box className={styles.rightWrapper}>
        <Typography variant="h5">
          {product.price.range.minPrice}₴ - {product.price.range.maxPrice}₴
        </Typography>
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
