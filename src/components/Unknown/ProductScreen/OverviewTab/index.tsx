import { Box } from '@mui/system';
import React from 'react';
import { GraphicsCard } from '../../../../../types';
import DescriptionBlock from '../DescriptionBlock';
import SpecsTable from '../SpecsTable';

type OverviewTabProps = {
  product: GraphicsCard;
};

const OverviewTab: React.FC<OverviewTabProps> = ({ product }) => {
  return (
    <Box>
      {product.description && (
        <DescriptionBlock description={product.description} />
      )}
      <SpecsTable product={product} />
    </Box>
  );
};

export default OverviewTab;
