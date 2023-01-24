import React from 'react';
import { Box } from '@mui/system';
import { Link, generatePath } from 'react-router-dom';
import { CarouselItem } from '../../../../types';
import { ROUTES } from '../../../common/constants';

type ItemProps = {
  item: CarouselItem;
  boxHeight: string;
  imageWidth: string;
};

const Item: React.FC<ItemProps> = ({ item, boxHeight, imageWidth }) => {
  return (
    <Link
      style={{ textDecoration: 'none' }}
      to={generatePath(ROUTES.PRODUCT, {
        category: item.category,
        id: item.id,
      })}
    >
      <Box display="flex" justifyContent="center" height={boxHeight}>
        <img
          style={{ width: imageWidth }}
          src={item.mainImage}
          alt={item.name}
        />
      </Box>
    </Link>
  );
};

export default Item;
