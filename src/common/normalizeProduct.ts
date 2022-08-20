import { Product } from '../../types';
import {
  BuildProduct,
  ProductSpecPropType,
} from '../components/Unknown/BuildScreen/Builder/BuilderProduct';

const normalizeProducts = <T extends Product>(
  products: T[],
  productSpecs: ProductSpecPropType[],
): BuildProduct[] =>
  products.map((product: any) => ({
    id: product.id,
    name: product.name,
    mainImage: product.mainImage,
    specs: productSpecs.map((spec) => ({
      name: spec.name as string,
      value: product[spec.propName] as string,
    })),
  }));

export default normalizeProducts;
