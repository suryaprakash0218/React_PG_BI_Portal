import { Box, Card, Hidden, Paper, Stack, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import ReactCardFlip from 'react-card-flip';
import CountUp from 'react-countup';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import { formatValue } from 'src/utils/formatNumber';

// const [isFlipped, setIsFlipped] = useState(false);
// const [isMouseOver, setIsMouseOver] = useState(false);
// const flipTimeout = useRef(null);

// const `handleMouseEnter` = () => {
//   setIsFlipped(true);
//   clearTimeout(flipTimeout.current);
// };

// const handleMouseLeave = () => {
//   setIsMouseOver(false);
//   flipTimeout.current = setTimeout(() => {
//     setIsFlipped(false);
//   }, 50); // Delay before resetting flip state
// };

const DashCards = ({ title, count, icon, borderLeft, onClick }) => {
  const [isHoverd, setIsHoverd] = useState(false);

  const mouseEnter = () => {
    if (title === 'Registrations' || title === 'Transactions') {
      setIsHoverd(false);
    } else {
      setIsHoverd(true);
    }
  };

  const mouseLeave = () => {
    setIsHoverd(false);
  };

  return (
    <>
      {/* <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal"> */}
      {isHoverd ? (
        <Card
          onMouseLeave={mouseLeave}
          onClick={() => onClick()}
          elevation={5}
          sx={{ p: 3, backgroundColor: 'gainsboro !important', cursor: 'pointer' }}
        >
          <Box alignItems={'center'} justifyContent={'center'} display={'flex'}>
            <Stack
              minWidth={500}
              minHeight={{ md: 86, sm: 71, xs: 71 }}
              direction={'row'}
              alignItems={'center'}
              justifyContent={'center'}
              display={'flex'}
            >
              <Typography mt={0.5} variant="h6">
                <AddCircleOutlineRoundedIcon />
              </Typography>
              <Typography variant="h6">Details</Typography>
            </Stack>
          </Box>
        </Card>
      ) : (
        <Card onMouseEnter={mouseEnter} elevation={5} sx={{ p: 3, borderLeft: `2px solid ${borderLeft} !important` }}>
          <Box>
            <Stack
              minWidth={200}
              maxWidth={500}
              direction={'row'}
              spacing={1}
              justifyContent={'space-between'}
              flexWrap={'nowrap'}
            >
              <Stack direction={'column'} spacing={1}>
                {/* <CountUp separator="," end={count} formattingFn={formatValue} /> */}
                <Typography variant="h3">{<CountUp separator="," end={count} formattingFn={formatValue} />}</Typography>
                <Typography fontFamily={'Helvetica'} variant="h5" color={'darkslateblue'}>
                  {title}
                </Typography>
              </Stack>
              <Hidden xsDown>
                <Typography>{icon}</Typography>
              </Hidden>
            </Stack>
          </Box>
        </Card>
      )}
      {/* </ReactCardFlip> */}
    </>
  );
};

export default DashCards;
