import classNames from 'classnames';
import { DATE_CHART_FORMAT, DATE_MONTH_FORMAT, DATE_TIME_FORMAT } from 'constant';
import { format } from 'date-fns';
import { FC, useState } from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useGetHistoricalData } from 'store/vault/selector';
import { convertStatistics, formatCurrency } from 'utils';

const CustomTooltip: FC<any> = ({ active, payload, label, type }) => {
  if (label && active && payload && payload.length) {
    return (
      <div className='custom-tooltip'>
        <p className='label'>{`${format(new Date(Number(label)), DATE_CHART_FORMAT)}`}</p>
        {type.value === 'apr' ? (
          <p className='value'>
            {type.name}: {payload[0].value}%
          </p>
        ) : (
          <p className='value'>
            {type.name}: ${payload[0].value}
          </p>
        )}
      </div>
    );
  }

  return null;
};
const HistoricalDashboard = () => {
  const [type, setType] = useState('price');
  const historicalData = useGetHistoricalData();
  // console.log(historicalData);

  // const [date, setDate] = useState('day');

  // const data = [
  //   {
  //     name: '2023-08-21T13:38:42.710Z',
  //     data: 9.2,
  //     test: 6.0,
  //   },
  //   {
  //     name: '2023-08-28T13:38:42.710Z',
  //     data: 10,
  //     test: 8.5,
  //   },
  //   {
  //     name: '2023-09-04T13:38:42.710Z',
  //     data: 13,
  //     test: 10.0,
  //   },
  //   {
  //     name: '2023-09-10T13:38:42.710Z',
  //     data: 12.53,
  //     test: 11.0,
  //   },
  //   {
  //     name: '2023-09-19T13:38:42.710Z',
  //     test: 9.0,
  //     data: 8.01,
  //   },
  // ];

  const historicalType = [
    {
      name: 'Share Price',
      value: 'price',
    },
    {
      name: 'TVL',
      value: 'tvl',
    },
    {
      name: 'APR',
      value: 'apr',
    },
  ];

  // const historicalDate = [
  //   {
  //     name: '1D',
  //     value: 'day',
  //   },
  //   {
  //     name: '1W',
  //     value: 'week',
  //   },
  //   {
  //     name: '1M',
  //     value: 'month',
  //   },
  //   {
  //     name: '1Y',
  //     value: 'year',
  //   },
  // ];

  const getYAxisScale = () => ({
    ticks: { stepSize: 1 },
  });

  return (
    <div className='historical'>
      <div className='filter'>
        <div className='type'>
          {historicalType.map((e) => {
            return (
              <div
                key={e.value}
                className={classNames('type-item', { active: type === e.value })}
                onClick={() => setType(e.value)}
              >
                {e.name}
              </div>
            );
          })}
        </div>

        {/* <div className='date'>
          {historicalDate.map((e) => {
            return (
              <div
                key={e.value}
                className={classNames('date-item', { active: date === e.value })}
                onClick={() => setDate(e.value)}
              >
                {e.name}
              </div>
            );
          })}
        </div> */}
      </div>

      <div className='dashboard-content'>
        {/* width='100%' height='100%' width={765} height={250}  */}
        {/* {historicalType.map((e) => {
          if (e.name === type && historicalData) {
            const data = historicalData?.aprData;
            return (
              <ResponsiveContainer height={250} width='100%'>
                <AreaChart
                  data={data || []}
                  margin={{
                    top: 30,
                    right: 30,
                    left: 0,
                    bottom: 20,
                  }}
                >
                  <defs>
                    <linearGradient id='colorUv' x1='100' y1='0' x2='100' y2='229.013' gradientUnits='userSpaceOnUse'>
                      <stop stopColor='red' stopOpacity='1' />
                      <stop offset='1' stopColor='blue' stopOpacity='0.27' />
                    </linearGradient>
                  </defs>

                  <XAxis
                    dataKey='timestamp'
                    tickFormatter={(data) => {
                      return format(new Date(data.timestamp), DATE_MONTH_FORMAT);
                    }}
                  />
                  <YAxis
                    tickLine={false}
                    dataKey={'value'}
                    tickFormatter={(data) => {
                      const value = formatCurrency(data.value, 0);
                      return `$${value}`;
                    }}
                  />
                  <CartesianGrid horizontal vertical={false} stroke='#29384E' />

                  {data && data.length > 0 && (
                    <Tooltip content={<CustomTooltip type={historicalType.find((x) => x.value == type)} />} />
                  )}
                  <Area type='monotone' dataKey='data' stroke='#8884d8' fillOpacity={1} fill='url(#colorUv)' />
                </AreaChart>
              </ResponsiveContainer>
              );
            }
          })} */}
        {historicalData && type === 'price' && (
          <ResponsiveContainer height={250} width='100%'>
            <AreaChart
              data={historicalData.sharePriceData}
              margin={{
                top: 30,
                right: 30,
                left: 10,
                bottom: 20,
              }}
            >
              <defs>
                <linearGradient id='colorUv' x1='100' y1='0' x2='100' y2='229.013' gradientUnits='userSpaceOnUse'>
                  <stop stopColor='#121856' stopOpacity='1' />
                  <stop offset='1' stopColor='#181F38' stopOpacity='0.27' />
                </linearGradient>
              </defs>

              <XAxis
                dataKey='timestamp'
                tickFormatter={(data) => {
                  return format(new Date(Number(data)), DATE_MONTH_FORMAT);
                }}
              />
              <YAxis
                tickLine={false}
                dataKey={'value'}
                domain={['dataMin - 1', 'dataMax + 1']}
                tickFormatter={(data) => {
                  const value = formatCurrency(Number(data), 0);
                  return `$${value}`;
                }}
              />
              <CartesianGrid horizontal vertical={false} stroke='#29384E' />

              {historicalData.sharePriceData && historicalData.sharePriceData.length > 0 && (
                <Tooltip content={<CustomTooltip type={historicalType.find((x) => x.value == type)} />} />
              )}
              <Area type='monotone' dataKey='value' stroke='#8884d8' fillOpacity={1} fill='url(#colorUv)' />
            </AreaChart>
          </ResponsiveContainer>
        )}

        {historicalData && type === 'tvl' && (
          <ResponsiveContainer height={250} width='100%'>
            <AreaChart
              data={historicalData.tvlData}
              margin={{
                top: 30,
                right: 30,
                left: 10,
                bottom: 20,
              }}
            >
              <defs>
                <linearGradient id='colorUv' x1='100' y1='0' x2='100' y2='229.013' gradientUnits='userSpaceOnUse'>
                  <stop stopColor='#121856' stopOpacity='1' />
                  <stop offset='1' stopColor='#181F38' stopOpacity='0.27' />
                </linearGradient>
              </defs>

              <XAxis
                dataKey='timestamp'
                tickFormatter={(data) => {
                  return format(new Date(Number(data)), DATE_MONTH_FORMAT);
                }}
              />
              <YAxis
                tickLine={false}
                dataKey={'value'}
                domain={['dataMin - 1000', 'dataMax + 1000']}
                tickFormatter={(data) => {
                  const value = formatCurrency(Number(data), 0);
                  return `$${value}`;
                }}
              />
              <CartesianGrid horizontal vertical={false} stroke='#29384E' />

              {historicalData.tvlData && historicalData.tvlData.length > 0 && (
                <Tooltip content={<CustomTooltip type={historicalType.find((x) => x.value == type)} />} />
              )}
              <Area type='monotone' dataKey='value' stroke='#8884d8' fillOpacity={1} fill='url(#colorUv)' />
            </AreaChart>
          </ResponsiveContainer>
        )}
        {historicalData && type === 'apr' && (
          <ResponsiveContainer height={250} width='100%'>
            <AreaChart
              data={historicalData.aprData}
              margin={{
                top: 30,
                right: 30,
                left: 10,
                bottom: 20,
              }}
            >
              <defs>
                <linearGradient id='colorUv' x1='100' y1='0' x2='100' y2='229.013' gradientUnits='userSpaceOnUse'>
                  <stop stopColor='#121856' stopOpacity='1' />
                  <stop offset='1' stopColor='#181F38' stopOpacity='0.27' />
                </linearGradient>
              </defs>

              <XAxis
                dataKey='timestamp'
                tickFormatter={(data) => {
                  return format(new Date(Number(data)), DATE_MONTH_FORMAT);
                }}
              />
              <YAxis
                tickLine={false}
                dataKey={'value'}
                allowDataOverflow={false}
                domain={[0, 'auto']}
                tickFormatter={(data) => {
                  // console.log(data);

                  const value = formatCurrency(Number(data), 2);
                  // console.log(value);

                  return `${value}%`;
                }}
              />
              <CartesianGrid horizontal vertical={false} stroke='#29384E' />

              {historicalData.aprData && historicalData.aprData.length > 0 && (
                <Tooltip content={<CustomTooltip type={historicalType.find((x) => x.value == type)} />} />
              )}
              <Area type='monotone' dataKey='value' stroke='#8884d8' fillOpacity={1} fill='url(#colorUv)' />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default HistoricalDashboard;
