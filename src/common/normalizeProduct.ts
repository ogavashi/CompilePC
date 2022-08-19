import { Product } from '../../types';
import { BuildProduct } from '../components/Unknown/BuildScreen/Builder/BuilderProduct';

const normalizeProducts = <T extends Product>(
  products: T[],
  specs: string[],
): BuildProduct[] =>
  products.map((product: { [key: string]: any }) => ({
    id: product.id,
    name: product.name,
    mainImage: product.mainImage,
    specs: specs.map((spec) => ({
      name: spec,
      value: product[spec.toLowerCase()],
    })),
  }));

export default normalizeProducts;
