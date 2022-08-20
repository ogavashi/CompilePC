import { Product } from '../../types';
import {
  BuilderProductSpec,
  BuildProduct,
  ProductSpecPropType,
} from '../components/Unknown/BuildScreen/Builder/BuilderProduct';

const normalizeProducts = <T extends Product>(
  products: T[],
  productSpecs: ProductSpecPropType<T>[],
): BuildProduct[] =>
  products.map((product) => {
    const specs: BuilderProductSpec[] = [];

    productSpecs.forEach((spec) => {
      const productSpec = product[spec.propName as keyof Product];

      if (productSpec) {
        specs.push({
          name: spec.name,
          value: productSpec,
        });
      }
    });

    return {
      id: product.id,
      name: product.name,
      mainImage: product.mainImage,
      specs,
    };
  });

export default normalizeProducts;
