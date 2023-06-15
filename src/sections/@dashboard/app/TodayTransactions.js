import { Box, Card, CardHeader } from '@mui/material';
import React, { useState } from 'react';
import { useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import ApexCharts from 'react-apexcharts';

const TodayTransactions = () => {
  const [chartOptions, setChartOptions] = useState({
    chart: {
      id: 'live-chart',
      animations: {
        enabled: true,
        easing: 'linear',
        dynamicAnimation: {
          speed: 1000,
        },
      },
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    xaxis: {
      type: 'datetime',
      range: 60000,
    },
    yaxis: {
      min: 0,
      max: Number(446),
    },
    series: [
      {
        name: 'Random Data',
        data: [],
      },
    ],
  });

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newDate = new Date().getTime();
      const newData = Math.floor(Math.random() * 100);

      setChartData([...chartData, { x: newDate, y: newData }].slice(-20));
    }, 5000);

    return () => clearInterval(interval);
  }, [chartData]);

  useEffect(() => {
    setChartOptions((prevState) => ({
      ...prevState,
      series: [
        {
          ...prevState.series[0],
          data: chartData,
        },
      ],
    }));
  }, [chartData]);

  return (
    <>
      <Card>
        <CardHeader title={'Today Live Transactions'} subheader={'Live Transaction'} />

        <Box sx={{ p: 1, pb: 1 }} dir="ltr">
          <ReactApexChart options={chartOptions} series={chartOptions.series} type="line" height={364} />
        </Box>
      </Card>
    </>
  );
};

export default TodayTransactions;
