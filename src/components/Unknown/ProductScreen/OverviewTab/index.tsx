import { Box } from '@mui/system';
import React from 'react';
import { Product } from '../../../../../types';
import DescriptionBlock from '../DescriptionBlock';

type OverviewTabProps = {
  product: Product;
};

const OverviewTab: React.FC<OverviewTabProps> = ({ product }) => {
  return (
    <Box>
      {product.description && (
        <DescriptionBlock description={product.description} />
      )}
    </Box>
  );
};

export default OverviewTab;
