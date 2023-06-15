import { Box, Card, CardHeader } from '@mui/material';
import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { numberWithCommas } from 'src/utils/formatNumber';

const ServiceRingCharts = ({ title, subheader, marginy, chartLabels, chartData, chartColors }) => {
  const chartOption = {
    series: chartData,
    options: {
      chart: {
        height: 380,
        type: 'radialBar',
      },
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 280,
        },
        radialBar: {
          dataLabels: {
            name: {
              fontSize: '22px',
            },
            value: {
              fontSize: '16px',
              formatter: function (val) {
                return numberWithCommas(val);
              },
            },
            // track: {
            //   hollow: {
            //     size: 400, // Adjust the width of the radial bar
            //   },
            // },
            total: {
              show: true,
              label: 'Total',
              formatter: function (w) {
                const total = w.config.series.reduce((a, b) => a + b, 0);
                return numberWithCommas(total);
              },
            },
          },
        },
      },
      colors: chartColors,
      stroke: {
        lineCap: 'butt',
        width: 10,
      },

      labels: chartLabels,
    },
  };

  return (
    <>
      <Card>
        <CardHeader title={title} subheader={subheader} />

        <Box
          justifyContent={'center'}
          alignItems={'center'}
          display={'flex'}
          minHeight={400}
          maxHeight={410}
          sx={{ mx: 3 }}
          dir="ltr"
        >
          <ReactApexChart options={chartOption.options} series={chartOption.series} type="radialBar" height={360} />
        </Box>
      </Card>
    </>
  );
};

export default ServiceRingCharts;
