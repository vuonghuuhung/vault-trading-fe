import React from 'react';
import NotFoundIcon from 'resources/svg/NotFoundIcon';

const NotFoundPage = () => {
  return (
    <div className='not-found-page-box'>
      <div className='notFound-content-1'>
        <NotFoundIcon />
      </div>
      <div className='notFound-content-2'>
        <NotFoundIcon width={375} height={766} />
      </div>
    </div>
  );
};

export default NotFoundPage;
