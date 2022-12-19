import React, { useState, useMemo, useContext } from 'react';
import { Typography } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Box } from '@mui/system';
import ProductAccordion from './ProductAccordion';
import BuilderProduct from './BuilderProduct';
import { IconByCategory } from '../../../common/constants';
import { ProductCategory } from '../../../../types';
import { AppContext } from '../../AppContext';
import SkeletonProduct from './SkeletonProduct';
import useProducts from '../../../hooks/useProducts';

type BuilderProps = {
  category: ProductCategory;
};

const Builder: React.FC<BuilderProps> = ({ category }) => {
  const { build } = useContext(AppContext);

  const { data: products, isLoading, isError } = useProducts(category);

  const selectedProduct = useMemo(
    () =>
      products?.find(
        (product) => product.id === build[category.categoryName]?.id,
      ),
    [build, category.categoryName, products],
  );

  const BuilderProducts = () => (
    <>
      {(isLoading ? Array.from(new Array(5)) : products || []).map(
        (product, index) =>
          product ? (
            <BuilderProduct
              product={product}
              key={product.id}
              category={category.categoryName}
            />
          ) : (
            // eslint-disable-next-line react/no-array-index-key
            <SkeletonProduct key={index} />
          ),
      )}
    </>
  );

  return (
    <ProductAccordion
      icon={IconByCategory[category.categoryName]}
      category={category}
      selectedProduct={selectedProduct}
    >
      {isError ? (
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <ErrorOutlineIcon />
          <Typography variant="h3">
            Couldn&#39;t load {category.categoryName}
          </Typography>
        </Box>
      ) : (
        <BuilderProducts />
      )}
    </ProductAccordion>
  );
};

export default Builder;
