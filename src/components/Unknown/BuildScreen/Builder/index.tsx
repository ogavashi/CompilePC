import React, {
  useState,
  useMemo,
  useEffect,
  useContext,
  useCallback,
} from 'react';
import { useFirebaseApp } from 'reactfire';
import ProductAccordion from './ProductAccordion';
import BuilderProduct from './BuilderProduct';
import { DEFAULT_REGION, IconByCategory } from '../../../../common/constants';
import { FetchedProduct, ProductCategory } from '../../../../../types';
import { UIContext } from '../../UIContext';
import { BuildScreenContext } from '../../BuildScreenContext';
import useQuery from '../../../../hooks/useQuery';

type BuilderProps = {
  category: ProductCategory;
};

const Builder: React.FC<BuilderProps> = ({ category }) => {
  const { handleSelectBuilder } = useContext(BuildScreenContext);
  const { setAlert } = useContext(UIContext);

  const [selectedId, setSelectedId] = useState<string>('');
  const [products, setProducts] = useState<FetchedProduct[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { parseCurrentParams } = useQuery();

  const handleAddProduct = (productId: string) => {
    handleSelectBuilder(category);
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
        const { data: newProducts }: { data: FetchedProduct[] } =
          await getProducts()({
            collectionName: category.collectionName,
            filter,
          });
        setProducts(newProducts);
      } catch (error) {
        setAlert({
          show: true,
          severity: 'error',
          message: 'Could not fetch products. Try again later',
        });
      }
      setIsLoading(false);
    };

    getCPUs();
  }, [getProducts, setAlert, parseCurrentParams, category.collectionName]);

  const selectedProduct = useMemo(
    () => products?.find((product) => product.id === selectedId),
    [products, selectedId],
  );

  return (
    <ProductAccordion
      icon={IconByCategory[category.categoryName]}
      category={category}
      selectedId={selectedId}
      selectedProduct={selectedProduct}
    >
      {!isLoading &&
        products?.map((product) => (
          <BuilderProduct
            product={product}
            key={product.id}
            handleSelect={handleAddProduct}
            selectedId={selectedId}
            category={category.categoryName}
          />
        ))}
    </ProductAccordion>
  );
};

export default Builder;
