import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { CarouselItem } from '../../../../types';
import Item from './Item';

type ImageCarouselProps = {
  items: CarouselItem[];
};

const ImageCarousel: React.FC<ImageCarouselProps> = ({ items }) => {
  return (
    <Carousel>
      {items.map((item, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <Item item={item} key={index} />
      ))}
    </Carousel>
  );
};

export default ImageCarousel;
