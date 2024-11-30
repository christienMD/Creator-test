import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import image1 from '/images/image1.jpg';
import image2 from '/images/image2.jpg';
import image3 from '/images/image3.jpg';

const images = [
  { src: image1, alt: 'image 1' },
  { src: image2, alt: 'image 2' },
  { src: image3, alt: 'image 3' },
];

const AuthCarousel: React.FC = () => {
  return (
    <Carousel
      autoPlay={true}
      interval={2500}
      infiniteLoop={true}
      showThumbs={false}
      showStatus={false}
      showArrows={false}
    >
      {images.map((image, index) => (
        <div key={index}>
          <img src={image.src} alt={image.alt} className="rounded" />
        </div>
      ))}
    </Carousel>
  );
};

export default AuthCarousel;
