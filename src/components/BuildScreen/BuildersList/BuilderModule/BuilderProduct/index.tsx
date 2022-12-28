import { IconButton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { generatePath, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useStyles from './styles';
import { CategoryName, Part } from '../../../../../../types';
import getShortSpecs from '../ShortSpecs/getShortSpecs';
import { selectAssemblyPart } from '../../../../../store/builder/selectors';
import {
  addAssemblyPart,
  removeAssemblyPart,
} from '../../../../../store/builder/slice';
import { ROUTES } from '../../../../../common/constants';

type ProductProps = {
  product: Part;
  category: CategoryName;
};

const BuilderProduct: React.FC<ProductProps> = ({ product, category }) => {
  const styles = useStyles();

  const dispatch = useDispatch();

  const selectedPart = useSelector(selectAssemblyPart(category));

  const CheckIcon = () =>
    selectedPart && selectedPart.id === product.id ? (
      <IconButton onClick={() => dispatch(removeAssemblyPart(category))}>
        <CloseRoundedIcon className={styles.redIcon} fontSize="large" />
      </IconButton>
    ) : (
      <IconButton
        onClick={() => dispatch(addAssemblyPart({ part: product, category }))}
      >
        <SwapHorizIcon className={styles.greenIcon} fontSize="large" />
      </IconButton>
    );

  const specs = getShortSpecs(product, category);

  return (
    <Box className={styles.wrapper}>
      <Box className={styles.leftWrapper}>
        <Link
          style={{ textDecoration: 'none' }}
          to={generatePath(ROUTES.PRODUCT, { category, id: product.id })}
        >
          <img
            className={styles.image}
            src={product.mainImage}
            alt={product.name}
          />
        </Link>
        <Box>
          <Link
            style={{ textDecoration: 'none' }}
            to={generatePath(ROUTES.PRODUCT, { category, id: product.id })}
          >
            <Typography variant="h5" className={styles.productName}>
              {product.name}
            </Typography>
          </Link>
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
        {selectedPart ? (
          <CheckIcon />
        ) : (
          <IconButton
            onClick={() =>
              dispatch(addAssemblyPart({ part: product, category }))
            }
          >
            <AddRoundedIcon className={styles.greenIcon} fontSize="large" />
          </IconButton>
        )}
      </Box>
    </Box>
  );
};

export default BuilderProduct;
