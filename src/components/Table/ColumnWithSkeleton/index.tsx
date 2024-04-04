import type { FC, PropsWithChildren } from 'react';

import { Skeleton } from 'antd';

const ColumnWithSkeleton: FC<PropsWithChildren<{ isLoading: boolean }>> = ({ isLoading, children }) => {
  if (isLoading) return <Skeleton.Input />;

  return <>{children}</>;
};

export default ColumnWithSkeleton;
