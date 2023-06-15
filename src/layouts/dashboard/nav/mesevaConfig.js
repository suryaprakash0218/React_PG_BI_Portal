import SvgColor from 'src/components/svg-color/SvgColor';

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const mesevaNavConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/meseva',
    icon: icon('ic_analytics'),
  },
];

export default mesevaNavConfig;
