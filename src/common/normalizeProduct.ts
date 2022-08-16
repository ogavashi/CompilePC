import { Product } from '../../types';
import { BuildProduct } from '../components/Unknown/BuildScreen/Builder/BuilderProduct';

const normalizeProducts = <T extends Product>(products: T[]): BuildProduct[] =>
  products.map((product) => ({
    id: product.id,
    name: product.name,
    mainImage: product.mainImage,
    specs: [],
  }));

export default normalizeProducts;
