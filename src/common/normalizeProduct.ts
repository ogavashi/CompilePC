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
      const specName = spec.propName as keyof Omit<Product, 'price'>;
      const productSpec = product[specName];

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
      priceRange: product.price.range,
      specs,
    };
  });

export default normalizeProducts;
