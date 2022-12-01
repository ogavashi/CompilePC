import { Box } from '@mui/system';
import React from 'react';
import { ProductCategory } from '../../../../../types';
import getSpecsTable, { Categories } from '../../../../common/getSpecsTable';
import DescriptionBlock from '../DescriptionBlock';
import SpecsTable from '../SpecsTable';

type OverviewTabProps = {
  product: ProductCategory;
};

const OverviewTab: React.FC<OverviewTabProps> = ({ product }) => {
  const productSpecs = getSpecsTable(product, Categories.GPU);

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
