import { Skeleton, Tab, Tabs, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';

import { CategoryName, ProductCategory } from '../../../../types';
import { ProductCategories, ProductPageTabs } from '../../../common/constants';
import useProduct from '../../../hooks/useProduct';
import { ErrorLoading } from '../Icons';
import OverviewTab from './OverviewTab';
import PriceTable from './PriceTable';
import StoresTab from './StoresTab';
import useStyles from './styles';

const ProductScreen: React.FC = () => {
  const styles = useStyles();

  const navigate = useNavigate();

  const { id, category: paramsCategory, '*': paramsTab } = useParams();

  const [currentTab, setCurrentTab] = useState<string>('');

  const category: ProductCategory =
    ProductCategories[paramsCategory as CategoryName];

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
    navigate(newValue);
  };

  useEffect(() => {
    const tab = paramsTab || '';
    const tabExists = ProductPageTabs.find(({ value }) => value === tab);
    if (category && tabExists) {
      setCurrentTab(tab);
    } else {
      navigate('/404');
    }
  }, [paramsTab, navigate, category]);

  const {
    data: product,
    isError,
    isLoading,
  } = useProduct(id as string, category);

  const productTitle = isError ? "Couldn't load product's name" : product?.name;

  const ProductImage = () =>
    isError ? (
      <ErrorLoading className={styles.image} />
    ) : (
      <img
        className={styles.image}
        alt={product?.name}
        src={product?.mainImage}
      />
    );

  return (
    <Box className={styles.mainContainer}>
      <Typography variant="h2" gutterBottom>
        {isLoading ? (
          <Skeleton animation="wave" variant="text" width={800} />
        ) : (
          productTitle
        )}
      </Typography>
      <Box>
        <Tabs value={currentTab} onChange={handleChange}>
          {ProductPageTabs.map(({ label, value }) => (
            <Tab label={label} value={value} disabled={isLoading} key={value} />
          ))}
        </Tabs>
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Box>
          {isLoading ? (
            <Skeleton
              animation="wave"
              variant="rectangular"
              width={560}
              height={364}
            />
          ) : (
            <ProductImage />
          )}
        </Box>
        <PriceTable
          product={product}
          stores={product?.stores}
          isError={isError}
          isLoading={isLoading}
        />
      </Box>
      {category && (
        <Routes>
          <Route
            path="/"
            element={
              <OverviewTab
                product={product}
                categoryName={category.categoryName}
                isError={isError}
                isLoading={isLoading}
              />
            }
          />
          <Route path="/reviews" element={<div>Nothing yet</div>} />
          <Route
            path="/stores"
            element={
              <StoresTab
                product={product}
                isError={isError}
                isLoading={isLoading}
              />
            }
          />
        </Routes>
      )}
    </Box>
  );
};

export default ProductScreen;
