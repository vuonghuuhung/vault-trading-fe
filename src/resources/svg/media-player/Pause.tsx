import type { FC, SVGProps } from 'react';

const Pause: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <path
      d='M2 4C2 2.89543 2.89543 2 4 2H8C9.10457 2 10 2.89543 10 4V20C10 21.1046 9.10457 22 8 22H4C2.89543 22 2 21.1046 2 20V4Z'
      fill='#141416'
    />
    <path
      d='M14 4C14 2.89543 14.8954 2 16 2H20C21.1046 2 22 2.89543 22 4V20C22 21.1046 21.1046 22 20 22H16C14.8954 22 14 21.1046 14 20V4Z'
      fill='#141416'
    />
  </svg>
);

export default Pause;
