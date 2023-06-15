import { Box, Card, Paper, Stack, Typography } from '@mui/material';
import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const DashCardCarousel = ({ showData }) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };
  return (
    <>
      <Box>
        <Carousel
          centerMode={false}
          swipeable={true}
          draggable={true}
          showDots={true}
          responsive={responsive}
          ssr={true} // means to render carousel on server-side.
          infinite={true}
          // autoPlay={this.props.deviceType !== 'mobile' ? true : false}
          autoPlaySpeed={500}
          keyBoardControl={true}
          // customTransition="1"
          transitionDuration={500}
          containerClass="carousel-container"
          removeArrowOnDeviceType={['tablet', 'mobile']}
          // deviceType={this.props.deviceType}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
        >
          {showData.map((item) => (
            <div>
              <Card sx={{ my: 3, maxWidth: 280 }}>
                <Box
                  sx={{ minHeight: 220 }}
                  padding={3}
                  justifyContent={'center'}
                  alignContent={'center'}
                  alignItems={'center'}
                >
                  <Box sx={{ mt: 1 }}>
                    <img src={item.image} width={item?.width} height={item?.height} />
                  </Box>
                  <Typography sx={{ mt: 2 }} mb={{ sm: 4, md: 0 }} variant="h6">
                    {item.serviceName}
                  </Typography>
                </Box>
              </Card>
            </div>
          ))}
        </Carousel>
      </Box>
    </>
  );
};

export default DashCardCarousel;
