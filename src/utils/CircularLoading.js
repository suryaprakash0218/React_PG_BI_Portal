import { Box, CircularProgress } from '@mui/material';
import React from 'react';

const CircularLoading = () => {
  return (
    <>
      {' '}
      <Box display="flex" justifyContent="center" alignItems="center" height="100%">
        <CircularProgress />
      </Box>
    </>
  );
};

export default CircularLoading;
