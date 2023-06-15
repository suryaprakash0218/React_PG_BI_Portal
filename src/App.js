import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';

// routes
// import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import { StyledChart } from './components/chart';
import ScrollToTop from './components/scroll-to-top';
// import { AdminRoutes } from './routes/AdminRoutes';
import { Suspense, useEffect } from 'react';
import Router from './routes';
import CircularLoading from './utils/CircularLoading';
import { useTheme } from '@mui/material';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ThemeProvider>
          <ScrollToTop />
          <StyledChart />
          <Suspense fallback={<CircularLoading />}>
            <Router />
          </Suspense>
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}
