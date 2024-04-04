import type { FC, SVGProps } from 'react';

const EqualIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns='http://www.w3.org/2000/svg' width='102' height='102' viewBox='0 0 102 102' fill='none'>
    <g filter='url(#filter0_d_1646_137221)'>
      <path d='M51 22.2847L71.5 42.7847L51 63.2847L30.5 42.7847L51 22.2847Z' fill='white'></path>
      <path
        d='M40.2881 39.1206V37.6646H61.7121V39.1206H40.2881ZM40.2881 47.2845V45.8286H61.7121V47.2845H40.2881Z'
        fill='#DA613A'
      ></path>
    </g>
    <defs>
      <filter
        id='filter0_d_1646_137221'
        x='0.5'
        y='0.284668'
        width='101'
        height='101'
        filterUnits='userSpaceOnUse'
        colorInterpolationFilters='sRGB'
      >
        <feFlood floodOpacity='0' result='BackgroundImageFix'></feFlood>
        <feColorMatrix
          in='SourceAlpha'
          type='matrix'
          values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
          result='hardAlpha'
        ></feColorMatrix>
        <feMorphology
          radius='5'
          operator='dilate'
          in='SourceAlpha'
          result='effect1_dropShadow_1646_137221'
        ></feMorphology>
        <feOffset dy='8'></feOffset>
        <feGaussianBlur stdDeviation='12.5'></feGaussianBlur>
        <feComposite in2='hardAlpha' operator='out'></feComposite>
        <feColorMatrix
          type='matrix'
          values='0 0 0 0 0.780392 0 0 0 0 0.803922 0 0 0 0 0.905882 0 0 0 0.25 0'
        ></feColorMatrix>
        <feBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_1646_137221'></feBlend>
        <feBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow_1646_137221' result='shape'></feBlend>
      </filter>
    </defs>
  </svg>
);

export default EqualIcon;
