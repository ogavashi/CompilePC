import { Product } from '../../types';
import {
  BuilderProductSpec,
  BuildProduct,
  ProductSpecPropType,
} from '../components/Unknown/BuildScreen/Builder/BuilderProduct';

const normalizeProducts = <T extends Product>(
  products: T[],
  productSpecs: ProductSpecPropType[],
): BuildProduct[] =>
  products.map((product) => {
    const filteredSpecs: BuilderProductSpec[] = [];

    productSpecs.forEach((spec) => {
      if (product[spec.propName as keyof Product]) {
        filteredSpecs.push({
          name: spec.name as string,
          value: product[spec.propName as keyof Product] as string,
        });
      }
    });

    return {
      id: product.id,
      name: product.name,
      mainImage: product.mainImage,
      specs: filteredSpecs,
    };
  });

export default normalizeProducts;
