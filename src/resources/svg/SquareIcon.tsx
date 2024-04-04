import type { FC, SVGProps } from 'react';

const SquareIcon: FC<SVGProps<SVGSVGElement>> = ({ fill = '#F8DFD8', ...props }) => (
  <svg xmlns='http://www.w3.org/2000/svg' width='32' height='33' viewBox='0 0 32 33' fill='none' {...props}>
    <path d='M16 0.784668L32 16.7847L16 32.7847L0 16.7847L16 0.784668Z' fill={fill}></path>
  </svg>
);

export default SquareIcon;
