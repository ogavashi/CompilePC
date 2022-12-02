import { Box } from '@mui/system';
import React from 'react';
import { FetchedProduct, ProductCategory } from '../../../../../types';
import getSpecsTable from '../../../../common/getSpecsTable';
import DescriptionBlock from '../DescriptionBlock';
import SpecsTable from '../SpecsTable';

type OverviewTabProps = {
  product: FetchedProduct;
  category: ProductCategory;
};

const OverviewTab: React.FC<OverviewTabProps> = ({ product, category }) => {
  const productSpecs = getSpecsTable(product, category);

  return (
    <Box>
      {product.description && (
        <DescriptionBlock description={product.description} />
      )}
      {productSpecs && <SpecsTable specs={productSpecs} />}
    </Box>
  );
};

export default OverviewTab;
