import { Box } from '@mui/system';
import React from 'react';
import { CategoryName, Part } from '../../../../../types';
import getSpecsTable from '../../../../specTables/getSpecsTable';
import DescriptionBlock from '../DescriptionBlock';
import SpecsTable from '../SpecsTable';

type OverviewTabProps = {
  product: Part | null;
  categoryName: CategoryName;
  isLoading: boolean;
  isError: boolean;
};

const OverviewTab: React.FC<OverviewTabProps> = ({
  product,
  categoryName,
  isLoading,
  isError,
}) => {
  const productSpecs = getSpecsTable(product, categoryName);

  const description = isError
    ? "Couldn't load product description"
    : product?.description || 'No description available';

  return (
    <Box>
      <DescriptionBlock description={description} isLoading={isLoading} />
      <SpecsTable
        specs={productSpecs}
        isLoading={isLoading}
        isError={isError}
      />
    </Box>
  );
};

export default OverviewTab;
