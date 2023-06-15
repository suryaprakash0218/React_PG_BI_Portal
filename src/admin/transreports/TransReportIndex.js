import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Box, Card, Grid, IconButton, Stack, Typography, Container } from '@mui/material';
import SettlementDetailedReport from './components/SettlementDetailedReport';
import TransactionReports from './reportForms/TransactionReports';

const TransReportIndex = () => {
  const stateData = useSelector((state) => state.reports);

  const { isData } = stateData;

  const contentRef = useRef(null);

  const scrollToContent = () => {
    console.log('scroll content worked');
    contentRef.current.scrollIntoView({ behavior: 'smooth' });
  };
  // useEffect(() => {
  //   console.log('is data changed');
  //   if (isData === true) {
  //     setTimeout(() => {
  //       scrollToContent();
  //     }, 1);
  //   }
  // }, [isData]);
  return (
    <>
      <Container maxWidth={'xl'}>
        <Grid container spacing={3}>
          {isData === false ? (
            <Grid item xs={12}>
              <TransactionReports scrollToContent={scrollToContent} />
            </Grid>
          ) : (
            <Grid ref={contentRef} item xs={12}>
              <div>{isData && <SettlementDetailedReport />}</div>
            </Grid>
          )}
        </Grid>
      </Container>
    </>
  );
};

export default TransReportIndex;
