import type { FC, SVGProps } from 'react';

const GitIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none'>
    <path
      fill='#181818'
      fillRule='evenodd'
      d='M12 1.873c-5.764 0-10.433 4.646-10.433 10.382 0 4.594 2.986 8.475 7.133 9.85.522.091.718-.22.718-.493 0-.246-.013-1.064-.013-1.934-2.622.48-3.3-.636-3.508-1.22-.118-.298-.626-1.22-1.07-1.466-.365-.195-.887-.675-.013-.688.822-.013 1.409.753 1.604 1.064.94 1.57 2.439 1.13 3.039.857.091-.675.365-1.13.665-1.389-2.321-.26-4.747-1.155-4.747-5.126 0-1.129.404-2.063 1.07-2.79-.105-.26-.47-1.324.104-2.751 0 0 .873-.273 2.869 1.064a9.725 9.725 0 0 1 2.608-.35c.887 0 1.773.116 2.608.35 1.995-1.35 2.87-1.064 2.87-1.064.573 1.427.208 2.491.103 2.75.666.728 1.07 1.65 1.07 2.791 0 3.984-2.439 4.867-4.76 5.126.378.325.704.948.704 1.921 0 1.389-.013 2.505-.013 2.855 0 .273.196.597.717.493 4.121-1.375 7.108-5.269 7.108-9.85 0-5.736-4.67-10.382-10.433-10.382Z'
      clipRule='evenodd'
    ></path>
  </svg>
);

export default GitIcon;