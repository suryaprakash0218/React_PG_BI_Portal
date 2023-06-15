import { Box, Card, CardHeader, styled } from '@mui/material';
import React from 'react';
import ReactApexChart from 'react-apexcharts';

const CHART_HEIGHT = 372;
const LEGEND_HEIGHT = 72;

const StyledChartWrapper = styled('div')(({ theme }) => ({
  height: CHART_HEIGHT,
  marginTop: theme.spacing(5),
  '& .apexcharts-canvas svg': { height: CHART_HEIGHT },
  '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
    overflow: 'visible',
  },
  '& .apexcharts-legend': {
    height: LEGEND_HEIGHT,
    alignContent: 'center',
    position: 'relative !important',
    borderTop: `solid 1px ${theme.palette.divider}`,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`,
  },
}));

const AppMobileUsers = ({ title, subheader, chartLabels, chartData }) => {
  const data = {
    series: chartData,
    options: {
      chart: {
        type: 'donut',
      },
      labels: chartLabels,
      responsive: [
        {
          breakpoint: 1980,
          options: {
            chart: {
              width: 380,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    },
  };

  return (
    <>
      <Card>
        <CardHeader title={title} subheader={subheader} />

        <Box
          sx={{ display: 'flex', justifyContent: 'center', py: 7.2 }}
          justifyContent={'center'}
          alignItems={'center'}
          dir="ltr"
        >
          <ReactApexChart options={data.options} series={data.series} type="donut" width={400} />
        </Box>
      </Card>
    </>
  );
};

export default AppMobileUsers;
