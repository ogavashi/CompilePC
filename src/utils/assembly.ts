import {
  Assembly,
  CarouselItem,
  CategoryName,
  Part,
  Product,
} from '../../types';

const getAverageSum = (assembly: Assembly): number => {
  const minPrice = Object.keys(assembly).reduce((sum, key) => {
    const part = assembly[key as CategoryName];
    return part ? sum + part.price.range.minPrice : sum + 0;
  }, 0);

  const maxPrice = Object.keys(assembly).reduce((sum, key) => {
    const part = assembly[key as CategoryName];
    return part ? sum + part.price.range.maxPrice : sum + 0;
  }, 0);

  return Math.round((maxPrice + minPrice) / 2);
};

const getAveragePrice = (part: Part): number => {
  const { minPrice } = part.price.range;
  const { maxPrice } = part.price.range;

  return Math.round((maxPrice + minPrice) / 2);
};

const isEmpty = (assembly: Assembly): boolean =>
  Object.values(assembly).every((part) => !part);

const getCarouselData = (assembly: Assembly): CarouselItem[] => {
  const assemblyParts = Object.entries(assembly)
    .filter(([, v]) => v)
    .map((part) => {
      const specs = part[1] as Product;
      const category = part[0] as CategoryName;
      return {
        id: specs.id,
        mainImage: specs.mainImage,
        name: specs.name,
        category,
      };
    });

  return assemblyParts;
};

export { getAverageSum, getAveragePrice, isEmpty, getCarouselData };
