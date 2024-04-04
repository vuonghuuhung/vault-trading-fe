import React, { useEffect, useState } from 'react';
import { useGetHistoricalData } from 'store/vault/selector';

interface remainingTimeProps {
  remainingHours: number;
  remainingMinutes: number;
  remainingSeconds: number;
}

const initialTime: remainingTimeProps = {
  remainingHours: 0,
  remainingMinutes: 0,
  remainingSeconds: 0,
};

const useGetTime = (time: string = '0') => {
  const [remainingTime, setRemainingTime] = useState(initialTime);
  const historicalData = useGetHistoricalData();
  useEffect(() => {
    const targetDate: Date = new Date(Number(historicalData?.nextTimeRebalance));
    const timeInterval = setInterval(() => {
      // Ngày giờ hiện tại
      const currentDate: Date = new Date();

      // Tính thời gian còn lại từ ngày hiện tại đến ngày giờ cụ thể trong tương lai
      const timeRemaining: number = targetDate.getTime() - currentDate.getTime();
      // Chuyển đổi thời gian còn lại thành đơn vị giờ, phút, giây
      if (timeRemaining > 0) {
        const remainingHours: number = Math.floor(timeRemaining / (1000 * 60 * 60));
        const remainingMinutes: number = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const remainingSeconds: number = Math.floor((timeRemaining % (1000 * 60)) / 1000);
        setRemainingTime({
          remainingHours,
          remainingMinutes,
          remainingSeconds,
        });
      } else {
        setRemainingTime(initialTime);
      }
    }, 1000);
    return () => {
      clearInterval(timeInterval);
    };
  }, [historicalData?.nextTimeRebalance]);

  return remainingTime;
};

export default useGetTime;
