'use client';

import { useEffect, useState } from 'react';
import { fetchEconomicIndicators, EconomicIndicator } from '../services/apiService';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const EconomicModeling: React.FC = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const getData = async () => {
      const indicators = await fetchEconomicIndicators();

      const formattedData = Object.values(
        indicators
          .filter((item) => !isNaN(parseFloat(item.valor_original)))
          .reduce((acc, item) => {
            const date = `${item.a_o}-${item.mes}`;
            if (!acc[date]) {
              acc[date] = { date, value: 0, count: 0 };
            }
            acc[date].value += parseFloat(item.valor_original);
            acc[date].count += 1;
            return acc;
          }, {} as Record<string, { date: string; value: number; count: number }>)
      ).map((item) => ({
        date: item.date,
        value: item.value / item.count,
      }));

      console.log("Processed Data:", formattedData); // Para depuración
      setData(formattedData);
    };

    getData();
  }, []);

  return (
    <section className="py-12 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="container mx-auto px-6">
        <h2 className="text-center text-2xl font-bold mb-6">
          Predictive Economic Modeling
        </h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
  dataKey="date"
  tickFormatter={(date) => {
    const [year, month] = date.split("-");
    return `${month.toUpperCase()} ${year}`;
  }}
  interval="preserveStartEnd"
/>
            <YAxis domain={['auto', 'auto']} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#82ca9d"
              activeDot={{ r: 8 }}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default EconomicModeling;
