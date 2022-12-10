import React, { useState, useMemo, useContext } from 'react';
import { Typography } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Box } from '@mui/system';
import ProductAccordion from './ProductAccordion';
import BuilderProduct from './BuilderProduct';
import { IconByCategory } from '../../../../common/constants';
import { ProductCategory } from '../../../../../types';
import { BuildScreenContext } from '../../BuildScreenContext';
import useProducts from '../../../../api/products';
import SkeletonProduct from './SkeletonProduct';

type BuilderProps = {
  category: ProductCategory;
};

const Builder: React.FC<BuilderProps> = ({ category }) => {
  const { handleSelectBuilder } = useContext(BuildScreenContext);

  const [selectedId, setSelectedId] = useState<string>('');

  const handleAddProduct = (productId: string) => {
    handleSelectBuilder(category);
    setSelectedId(productId);
  };

  const { data: products, isLoading, isError } = useProducts(category);

  const selectedProduct = useMemo(
    () => products?.find((product) => product.id === selectedId),
    [products, selectedId],
  );

  const BuilderProducts = () => (
    <>
      {(isLoading ? Array.from(new Array(5)) : products || []).map(
        (product, index) =>
          product ? (
            <BuilderProduct
              product={product}
              key={product.id}
              handleSelect={handleAddProduct}
              selectedId={selectedId}
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
      selectedId={selectedId}
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
