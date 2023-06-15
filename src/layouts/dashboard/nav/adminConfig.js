// component
import SvgColor from '../../../components/svg-color';
import ReceiptIconTwoTone from '@mui/icons-material/ReceiptTwoTone';
import ReceiptLongIconTwoTone from '@mui/icons-material/ReceiptLongTwoTone';
import AssessmentIcon from '@mui/icons-material/Assessment';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/admin',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Find Transactions',
    path: '/dashboard/user',
    icon: <ReceiptLongIconTwoTone />,
  },
  {
    title: 'Latest Transations',
    path: '/dashboard/lasttransactions',
    icon: <ReceiptIconTwoTone />,
  },
  {
    title: 'Transactions Reports',
    path: '/dashboard/reports',
    icon: <AssessmentIcon />,
  },
  // {
  //   title: 'blog',
  //   path: '/dashboard/blog',
  //   icon: icon('ic_blog'),
  // },
  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: icon('ic_lock'),
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
];

export default navConfig;
