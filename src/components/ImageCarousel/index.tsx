import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { CarouselItem } from '../../../types';
import Item from './Item';

type ImageCarouselProps = {
  items: CarouselItem[];
  boxHeight?: string;
  imageWidth?: string;
};

const ImageCarousel: React.FC<ImageCarouselProps> = ({
  items,
  boxHeight = '400px',
  imageWidth = '500px',
}) => {
  return (
    <Carousel>
      {items.map((item) => (
        <Item
          item={item}
          imageWidth={imageWidth}
          boxHeight={boxHeight}
          key={item.id}
        />
      ))}
    </Carousel>
  );
};

export default ImageCarousel;

ImageCarousel.defaultProps = {
  boxHeight: '400px',
  imageWidth: '500px',
};
