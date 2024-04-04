import type { FC, SVGProps } from 'react';

const PlusIcon: FC<SVGProps<SVGSVGElement>> = ({ fill = '#DA613A', ...props }) => (
  <svg xmlns='http://www.w3.org/2000/svg' width='41' height='41' viewBox='0 0 42 42' fill='none' {...props}>
    <path d='M21 0.784668L41.5 21.2847L21 41.7847L0.5 21.2847L21 0.784668Z' fill='white'></path>
    <path d='M20.2233 32.7847V9.78467H21.7767V32.7847H20.2233ZM11 22.0002V20.5691H31V22.0002H11Z' fill={fill}></path>
  </svg>
);

export default PlusIcon;
