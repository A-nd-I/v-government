import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

interface DataPoint {
  codigo: string;
  indicador: string;
  mes_no: string;
  a_o: string;
  mes: string;
  categoria: string;
  valor_original: string;
}

const useEconomicData = () => {
  const [data, setData] = useState<DataPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://www.datos.gov.co/resource/m5ti-ecrw.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An error occurred'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

const LoadingState = () => (
  <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg">
    <p className="text-gray-600">Cargando datos económicos...</p>
  </div>
);

const ErrorState = ({ message }: { message: string }) => (
  <div className="p-4 bg-red-50 rounded-lg">
    <p className="text-red-600">{message}</p>
  </div>
);

const ChartCard = ({ children, title }: { children: React.ReactNode; title: string }) => (
  <div className="p-4 bg-white rounded-lg shadow">
    <h3 className="text-lg font-semibold mb-4 text-gray-800">{title}</h3>
    <div className="h-64">
      {children}
    </div>
  </div>
);

const createChartComponent = (
  data: DataPoint[],
  code: string,
  color: string,
  yAxisLabel?: string
) => {
  const filteredData = data
    .filter(item => item.codigo === code)
    .sort((a, b) => {
      const dateA = new Date(parseInt(a.a_o), parseInt(a.mes_no) - 1);
      const dateB = new Date(parseInt(b.a_o), parseInt(b.mes_no) - 1);
      return dateA.getTime() - dateB.getTime();
    })
    .map(item => ({
      date: `${item.mes}/${item.a_o}`,
      value: parseFloat(item.valor_original)
    }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={filteredData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="date" 
          tick={{ fontSize: 12 }}
          interval="preserveStartEnd"
        />
        <YAxis 
          label={{ 
            value: yAxisLabel, 
            angle: -90, 
            position: 'insideLeft',
            style: { fontSize: 12 }
          }}
          tick={{ fontSize: 12 }}
        />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={2}
          dot={{ r: 2 }}
          activeDot={{ r: 5 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

const EconomicDashboard = () => {
  const { data, loading, error } = useEconomicData();

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error.message} />;
  if (!data?.length) return <ErrorState message="No hay datos disponibles" />;

  const charts = [
    { code: 'I.4.1', title: 'Precio Internacional del Petróleo', color: '#4DB6AC', yAxisLabel: 'USD/Barril' },
    { code: 'I.4.2', title: 'Precio Internacional del Café', color: '#996633', yAxisLabel: 'Centavos USD/Libra' },
    { code: 'I.4.3', title: 'Tasa Representativa del Mercado', color: '#2196F3', yAxisLabel: 'COP/USD' },
    { code: 'N.5.1', title: 'Tasa de Desempleo', color: '#F44336', yAxisLabel: 'Porcentaje (%)' },
    { code: 'N.5.2', title: 'Tasa de Ocupación', color: '#3F51B5', yAxisLabel: 'Porcentaje (%)' },
    { code: 'N.6.1', title: 'IPC - Variación Porcentual', color: '#FF9800', yAxisLabel: 'Porcentaje (%)' },
    { code: 'N.6.2', title: 'Índice de Precios al Productor', color: '#9C27B0', yAxisLabel: 'Índice' },
    { code: 'N.7.1', title: 'PIB - Crecimiento Anual', color: '#009688', yAxisLabel: 'Porcentaje (%)' },
    { code: 'N.7.2', title: 'Indicador de Seguimiento a la Economía', color: '#673AB7', yAxisLabel: 'Índice' },
    { code: 'N.7.3', title: 'Producción Industrial', color: '#FFC107', yAxisLabel: 'Índice' },
    { code: 'L.2.1', title: 'Costo de Construcción de Vivienda', color: '#795548', yAxisLabel: 'Índice' },
    { code: 'L.2.2', title: 'Índice de Precios de Vivienda Nueva', color: '#E91E63', yAxisLabel: 'Índice' },
    { code: 'L.8.2', title: 'Búsqueda de Empleo - Google Trends', color: '#607D8B', yAxisLabel: 'Índice' },
    { code: 'D.4.1', title: 'Ingresos de Remesas', color: '#CDDC39', yAxisLabel: 'Millones USD' },
    { code: 'L.5.1', title: 'Tasa de Desempleo Urbana', color: '#FF5722', yAxisLabel: 'Porcentaje (%)' },
    { code: 'L.5.2', title: 'Tasa de Ocupación Urbana', color: '#3E2723', yAxisLabel: 'Porcentaje (%)' },
    { code: 'L.5.3', title: 'Número de Ocupados', color: '#607D8B', yAxisLabel: 'Miles de personas' },
    { code: 'L.4.1', title: 'Índice de Precios al Consumidor', color: '#9E9E9E', yAxisLabel: 'Índice' }
  ];

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">Dashboard Económico de Colombia</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {charts.map((chart, index) => (
          <ChartCard key={index} title={chart.title}>
            {createChartComponent(data, chart.code, chart.color, chart.yAxisLabel)}
          </ChartCard>
        ))}
      </div>
    </div>
  );
};

export default EconomicDashboard;
