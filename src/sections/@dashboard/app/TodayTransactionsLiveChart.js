import { Box, Card, CardHeader } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';
import { environmentURLMYSQL } from 'src/environmentUrl';
import { useDispatch, useSelector } from 'react-redux';
import { getMysqlTotalCount } from 'src/redux/admin/AdminActions';

const TodayTransactionsLiveChart = ({ liveData }) => {
  const { totalCount } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
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
      max: Number(totalCount?.allData),
    },
    series: [
      {
        name: 'Today Transactions',
        data: [],
      },
    ],
  });

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(getMysqlTotalCount());
      const newDate = new Date().getTime();
      const newData = totalCount?.allData;

      setChartData([...chartData, { x: newDate, y: newData }].slice(-20));
    }, 7000);

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
          <ReactApexChart options={chartOptions} series={chartOptions.series} type="line" height={360} />
        </Box>
      </Card>
    </>
  );
};

export default TodayTransactionsLiveChart;
