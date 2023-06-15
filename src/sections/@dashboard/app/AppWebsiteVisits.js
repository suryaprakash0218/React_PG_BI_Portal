import PropTypes from 'prop-types';
import ReactApexChart from 'react-apexcharts';
// @mui
import { Card, CardHeader, Box, CircularProgress } from '@mui/material';
// components
import { useChart } from '../../../components/chart';
import CircularLoading from 'src/utils/CircularLoading';
// ----------------------------------------------------------------------

AppWebsiteVisits.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  chartData: PropTypes.array.isRequired,
  chartLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default function AppWebsiteVisits({ title, subheader, chartLabels, chartData, ...other }) {
  const chartOptions = useChart({
    plotOptions: { bar: { columnWidth: '16%' } },
    fill: { type: chartData.map((i) => i.fill) },
    labels: chartLabels,
    xaxis: {
      type: 'datetime',
      labels: {
        datetimeFormatter: {
          year: 'yyyy',
          month: "MMM 'yy",
          day: 'dd MMM',
          hour: 'HH:mm',
        },
      },
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y) => {
          if (typeof y !== 'undefined') {
            // return `${y.toFixed(0)} Transactions`;
            // return y.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            return `${y.toLocaleString()} Transactions`;
          }
          return y;
        },
      },
    },
  });

  return (
    <>
      {/* {JSON.stringify(chartLabels)} */}
      {Object.keys(chartLabels).length !== 0 ? (
        <Card {...other}>
          <CardHeader title={title} subheader={subheader} />

          <Box sx={{ p: 3, pb: 1 }} dir="ltr">
            <ReactApexChart type="line" series={chartData} options={chartOptions} height={364} />
          </Box>
        </Card>
      ) : (
        <Card {...other}>
          <CardHeader title={title} subheader={subheader} />

          <Box
            sx={{ p: 3, pb: 1 }}
            display="flex"
            justifyContent={'center'}
            alignItems={'center'}
            height={410}
            dir="ltr"
          >
            <CircularProgress />
          </Box>
        </Card>
      )}
    </>
  );
}
