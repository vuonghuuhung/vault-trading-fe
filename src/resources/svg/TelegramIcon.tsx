import type { FC, SVGProps } from 'react';

const TelegramIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg width='48' height='48' viewBox='0 0 48 48' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <rect width='48' height='48' rx='12' fill='#313C65' />
    <g clipPath='url(#clip0_3864_18070)'>
      <path
        d='M21.4171 27.1814L21.0201 32.7654C21.5881 32.7654 21.8341 32.5214 22.1291 32.2284L24.7921 29.6834L30.3101 33.7244C31.3221 34.2884 32.0351 33.9914 32.3081 32.7934L35.9301 15.8214L35.9311 15.8204C36.2521 14.3244 35.3901 13.7394 34.4041 14.1064L13.1141 22.2574C11.6611 22.8214 11.6831 23.6314 12.8671 23.9984L18.3101 25.6914L30.9531 17.7804C31.5481 17.3864 32.0891 17.6044 31.6441 17.9984L21.4171 27.1814Z'
        fill='white'
      />
    </g>
    <defs>
      <clipPath id='clip0_3864_18070'>
        <rect width='24' height='24' fill='white' transform='translate(12 12)' />
      </clipPath>
    </defs>
  </svg>
);

export default TelegramIcon;
