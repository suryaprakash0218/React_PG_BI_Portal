import { Box, Card, CardHeader } from '@mui/material';
import React from 'react';
import ReactApexChart from 'react-apexcharts';

const ServiceTreeMap = ({ title, subheader, chartData }) => {
  const chartOption = {
    series: [
      {
        data: chartData,
      },
    ],
    options: {
      legend: {
        show: false,
      },
      chart: {
        height: 350,
        type: 'treemap',
      },
      // title: {
      //   text: 'Distibuted Treemap (different color for each cell)',
      //   align: 'center',
      // },
      colors: [
        '#3B93A5',
        '#F7B844',
        '#ADD8C7',
        '#EC3C65',
        '#CDD7B6',
        '#C1F666',
        '#D43F97',
        '#1E5D8C',
        '#421243',
        '#7F94B0',
        '#EF6537',
        '#C0ADDB',
      ],
      plotOptions: {
        treemap: {
          distributed: true,
          enableShades: false,
        },
      },
    },
  };

  return (
    <>
      <Card>
        <CardHeader title={title} subheader={subheader} />

        <Box sx={{ mx: 3 }} dir="ltr">
          <ReactApexChart options={chartOption.options} series={chartOption.series} type="treemap" height={350} />
        </Box>
      </Card>
    </>
  );
};

export default ServiceTreeMap;
