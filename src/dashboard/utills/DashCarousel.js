import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';

const DashCarousel = () => {
  return (
    <>
      <Carousel autoPlay={true} infiniteLoop={true} owArrows={true} showThumbs={false}>
        <div>
          <img src="/assets/images/banners/bill&recharge.svg" />
        </div>
        <div>
          <img src="/assets/images/banners/booking.svg" />
        </div>
        <div>
          <img src="/assets/images/banners/RTA.svg" />
        </div>
      </Carousel>
    </>
  );
};

export default DashCarousel;
