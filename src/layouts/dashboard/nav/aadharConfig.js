import SvgColor from 'src/components/svg-color/SvgColor';

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const aadharNavConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/aadhar',
    icon: icon('ic_analytics'),
  },
];

export default aadharNavConfig;
