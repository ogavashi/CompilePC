import { Box } from '@mui/system';
import React from 'react';
import { CategoryName, FetchedProduct } from '../../../../../types';
import getSpecsTable from '../../../../common/getSpecsTable';
import DescriptionBlock from '../DescriptionBlock';
import SpecsTable from '../SpecsTable';

type OverviewTabProps = {
  product: FetchedProduct;
  categoryName: CategoryName;
};

const OverviewTab: React.FC<OverviewTabProps> = ({ product, categoryName }) => {
  const productSpecs = getSpecsTable(product, categoryName);
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
