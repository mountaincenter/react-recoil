import React from 'react';
import { type Post } from 'interfaces';
import Carousel from 'react-material-ui-carousel';
import { CardMedia } from '@mui/material';

interface CarouselImageProps {
  post: Post;
}

const CarouselImage: React.FC<CarouselImageProps> = ({
  post,
}: CarouselImageProps) => {
  return (
    <>
      {post.images.length > 0 ? (
        <Carousel autoPlay={false}>
          {post.images.map((image, index) => {
            return (
              <CardMedia
                key={index}
                component="img"
                src={image.url}
                alt="post image"
              />
            );
          })}
        </Carousel>
      ) : (
        <></>
      )}
    </>
  );
};

export default CarouselImage;
