// @mui
import PropTypes from 'prop-types';
import { alpha, createTheme, styled } from '@mui/material/styles';
import { Button, Card, CardActions, CardHeader, IconButton, Typography } from '@mui/material';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';
// components
import Iconify from '../../../components/iconify';

import CountUp from 'react-countup';

import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import { LoadingButton } from '@mui/lab';
import { purple } from '@mui/material/colors';
import ReactCardFlip from 'react-card-flip';
import { useState } from 'react';

// ----------------------------------------------------------------------

const StyledIcon = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(6),
  height: theme.spacing(6),
  justifyContent: 'center',
  marginBottom: theme.spacing(1),
}));

// ----------------------------------------------------------------------

AppWidgetSummary.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  total: PropTypes.number,
  sx: PropTypes.object,
};

export default function AppWidgetSummary({
  title,
  total,
  icon,
  color = 'primary',
  shade,
  button,
  onClick,
  buttonName,
  buttonLoading,
  infoClick,
  info,
  sx,
  cardClick,
  ...other
}) {
  const [flipped, setFlipped] = useState(false);

  const [mouseOver, setMouseOver] = useState(false);

  // const mouseEnter = () => {
  //   setMouseOver(true)
  // }

  // const mouseOut = () => {
  //   setMouseOver(false)
  // }

  return (
    <>
      {/* <ReactCardFlip isFlipped={flipped} flipDirection="horizontal"> */}
      <Card
        onMouseEnter={() => setMouseOver(true)}
        onMouseLeave={() => setMouseOver(false)}
        onClick={cardClick ? () => cardClick() : null}
        style={cardClick ? { cursor: 'pointer' } : { cursor: 'default' }}
        sx={{
          pt: 2,
          pb: 2,
          boxShadow: mouseOver ? 6 : 0,
          textAlign: 'center',
          color: (theme) => theme.palette[color].darker,
          bgcolor: (theme) => theme.palette[color].lighter,
          ...sx,
        }}
        {...other}
      >
        {button ? (
          <LoadingButton
            sx={{ marginTop: 2, marginBottom: 2 }}
            variant="outlined"
            color="error"
            onClick={() => onClick()}
            loading={buttonLoading}
            startIcon={<PriorityHighIcon />}
          >
            {buttonName}
          </LoadingButton>
        ) : icon ? (
          <StyledIcon
            sx={{
              maxWidth: 200,
              color: (theme) => theme.palette[color].dark,
              backgroundImage: (theme) =>
                `linear-gradient(100deg, ${alpha(theme.palette[color].dark, 0)} 0%, ${alpha(
                  theme.palette[color].dark,
                  0.24
                )} 100%)`,
            }}
          >
            <Iconify icon={icon} width={20} height={20} />
          </StyledIcon>
        ) : (
          ''
        )}

        <Typography variant="h3">
          <CountUp separator="," end={Number(total)} duration={1} />
        </Typography>

        <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
          {title}
        </Typography>
        {info && (
          <Button onClick={() => infoClick()} sx={{ mt: 1 }} color={color} size="small" variant="outlined">
            info
          </Button>
        )}
      </Card>
      {/* <Card
        onMouseLeave={() => setFlipped(false)}
        sx={{
          pt: 2,
          pb: 2,
          boxShadow: 0,
          textAlign: 'center',
          color: (theme) => theme.palette[color].darker,
          bgcolor: (theme) => theme.palette[color].lighter,
          ...sx,
        }}
      >
        <Typography h6>Test</Typography>
      </Card> */}
      {/* // </ReactCardFlip> */}
    </>
  );
}
