import { Box, Container, Grid, IconButton, Stack } from '@mui/material';
import React, { useRef } from 'react';
import PgLogsIndex from './pglogs/PgLogsIndex';
import PgTransactionsIndex from './pgtransactions/PgTransactionsIndex';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Outlet, useNavigate } from 'react-router-dom';

const PgIndex = () => {
  const navigate = useNavigate();

  const contentRef = useRef(null);

  const scrollToContent = () => {
    contentRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Container maxWidth={'xl'}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <IconButton onClick={() => navigate(-1)} aria-label="back">
            <ArrowBackIcon />
          </IconButton>
        </Stack>
        <Grid container spacing={5}>
          <Grid item xs={12} md={6}>
            <PgLogsIndex contentRef={contentRef} scrollToContent={scrollToContent} />
          </Grid>
          <Grid item xs={12} md={6}>
            <PgTransactionsIndex contentRef={contentRef} scrollToContent={scrollToContent} />
          </Grid>
          <Grid item md={12} overflow={'auto'}>
            <div ref={contentRef}>
              <Box ref={contentRef}></Box>
              <Outlet />
            </div>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default PgIndex;
