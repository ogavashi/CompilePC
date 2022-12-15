import React from 'react';
import { FullProduct } from '../../../../types';
import StoresTable from './StoresTable';

type StoresTabProps = {
  product: FullProduct | undefined;
  isError: boolean;
  isLoading: boolean;
};

const StoresTab: React.FC<StoresTabProps> = ({
  product,
  isError,
  isLoading,
}) => {
  return (
    <StoresTable product={product} isError={isError} isLoading={isLoading} />
  );
};

export default StoresTab;
