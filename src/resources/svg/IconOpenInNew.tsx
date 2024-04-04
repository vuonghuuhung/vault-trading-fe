import type { FC, SVGProps } from 'react';

const IconOpenInNew: FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg width='15' height='15' viewBox='0 0 15 15' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path
        d='M11.5833 11.5833H3.41667V3.41667H7.5V2.25H3.41667C2.76917 2.25 2.25 2.775 2.25 3.41667V11.5833C2.25 12.225 2.76917 12.75 3.41667 12.75H11.5833C12.225 12.75 12.75 12.225 12.75 11.5833V7.5H11.5833V11.5833ZM8.66667 2.25V3.41667H10.7608L5.02667 9.15083L5.84917 9.97333L11.5833 4.23917V6.33333H12.75V2.25H8.66667Z'
        fill='#5F8AFA'
      />
    </svg>
  );
};

export default IconOpenInNew;
