import React, {
  useState,
  useMemo,
  useEffect,
  useContext,
  useCallback,
} from 'react';
import { useFirebaseApp } from 'reactfire';
import ProductAccordion from '../ProductAccordion';
import { CPUIcon } from '../../../Icons';
import BuilderProduct, { ProductSpecPropType } from '../BuilderProduct';
import {
  DEFAULT_REGION,
  ProductCategoryByCollection,
} from '../../../../../common/constants';
import { CPU } from '../../../../../../types';
import normalizeProducts from '../../../../../common/normalizeProduct';
import { UIContext } from '../../../UIContext';
import { BuildScreenContext } from '../../../BuildScreenContext';
import useQuery from '../../../../../hooks/useQuery';

const CPUBuilder: React.FC = () => {
  const { handleSelectBuilder } = useContext(BuildScreenContext);
  const { setAlert } = useContext(UIContext);

  const [selectedId, setSelectedId] = useState<string>('');
  const [products, setProducts] = useState<CPU[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { parseCurrentParams } = useQuery();

  const specs: ProductSpecPropType<CPU>[] = useMemo(
    () => [
      { propName: 'series', name: 'Series' },
      { propName: 'socket', name: 'Socket' },
      { propName: 'threads', name: 'Threads' },
    ],
    [],
  );
  const handleAddProduct = (productId: string) => {
    handleSelectBuilder(ProductCategoryByCollection.CPUs);
    setSelectedId(productId);
  };

  const functions = useFirebaseApp().functions(DEFAULT_REGION);

  const getProducts = useCallback(
    () => functions.httpsCallable('getProducts'),
    [functions],
  );

  useEffect(() => {
    const getCPUs = async () => {
      try {
        const filter = parseCurrentParams();
        setIsLoading(true);
        const { data: newProducts }: { data: CPU[] } = await getProducts()({
          collectionName: 'CPUs',
          filter,
        });
        setProducts(newProducts);
      } catch (error) {
        setAlert({
          show: true,
          severity: 'error',
          message: 'Could not fetch products',
        });
      }
      setIsLoading(false);
    };

    getCPUs();
  }, [getProducts, setAlert, parseCurrentParams]);

  const normalizedProducts = useMemo(
    () => products && normalizeProducts(products, specs),
    [products, specs],
  );

  const selectedProduct = useMemo(
    () => normalizedProducts?.find((product) => product.id === selectedId),
    [normalizedProducts, selectedId],
  );

  return (
    <ProductAccordion
      icon={CPUIcon}
      category={ProductCategoryByCollection.CPUs}
      selectedId={selectedId}
      selectedProduct={selectedProduct}
    >
      {!isLoading &&
        normalizedProducts?.map((product) => (
          <BuilderProduct
            product={product}
            key={product.id}
            handleSelect={handleAddProduct}
            selectedId={selectedId}
          />
        ))}
    </ProductAccordion>
  );
};

export default CPUBuilder;
