import type { FC, SVGProps } from 'react';

const Play: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width='19'
    height='22'
    viewBox='0 0 19 22'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    xmlnsXlink='http://www.w3.org/1999/xlink'
    {...props}
  >
    <rect width='19' height='22' fill='#C9C9C9' />
    <g filter='url(#filter0_d)'>
      <rect x='-355' y='-374' width='971' height='864' rx='16' fill='white' />
    </g>
    <rect x='-311' y='-246' width='883' height='290' rx='16' fill='#F4F5F6' />
    <rect x='-39' y='-245' width='334.115' height='288' fill='url(#pattern0)' />
    <g filter='url(#filter1_d)'>
      <rect x='-23' y='-9' width='302' height='40' rx='20' fill='white' />
      <path
        d='M0.699951 3.38562C0.699951 1.03509 3.28044 -0.402389 5.27902 0.834823L17.5794 8.44937C19.474 9.62221 19.474 12.3781 17.5794 13.551L5.27902 21.1655C3.28044 22.4027 0.699951 20.9652 0.699951 18.6147V3.38562Z'
        fill='#141416'
      />
    </g>
    <defs>
      <filter
        id='filter0_d'
        x='-371'
        y='-374'
        width='1003'
        height='944'
        filterUnits='userSpaceOnUse'
        colorInterpolationFilters='sRGB'
      >
        <feFlood floodOpacity='0' result='BackgroundImageFix' />
        <feColorMatrix
          in='SourceAlpha'
          type='matrix'
          values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
          result='hardAlpha'
        />
        <feMorphology radius='48' operator='erode' in='SourceAlpha' result='effect1_dropShadow' />
        <feOffset dy='64' />
        <feGaussianBlur stdDeviation='32' />
        <feColorMatrix type='matrix' values='0 0 0 0 0.121569 0 0 0 0 0.184314 0 0 0 0 0.27451 0 0 0 0.12 0' />
        <feBlend mode='multiply' in2='BackgroundImageFix' result='effect1_dropShadow' />
        <feBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow' result='shape' />
      </filter>
      <pattern id='pattern0' patternContentUnits='objectBoundingBox' width='1' height='1'>
        <use xlinkHref='#image0' transform='scale(0.000520833)' />
      </pattern>
      <filter
        id='filter1_d'
        x='-31'
        y='-9'
        width='318'
        height='56'
        filterUnits='userSpaceOnUse'
        colorInterpolationFilters='sRGB'
      >
        <feFlood floodOpacity='0' result='BackgroundImageFix' />
        <feColorMatrix
          in='SourceAlpha'
          type='matrix'
          values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
          result='hardAlpha'
        />
        <feMorphology radius='8' operator='erode' in='SourceAlpha' result='effect1_dropShadow' />
        <feOffset dy='8' />
        <feGaussianBlur stdDeviation='8' />
        <feColorMatrix type='matrix' values='0 0 0 0 0.0583333 0 0 0 0 0.0583333 0 0 0 0 0.0583333 0 0 0 0.2 0' />
        <feBlend mode='multiply' in2='BackgroundImageFix' result='effect1_dropShadow' />
        <feBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow' result='shape' />
      </filter>
    </defs>
  </svg>
);

export default Play;
