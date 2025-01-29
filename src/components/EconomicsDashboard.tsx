import { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Types for the API response
interface DataPoint {
  codigo: string;
  indicador: string;
  mes_no: string;
  a_o: string;
  mes: string;
  categoria: string;
  valor_original: string;
}

// Enum for indicator codes
enum IndicatorCode {
  TRM = 'I.4.3',
  Unemployment = 'N.5.1',
  // Add other codes as needed
}

// Custom hook for fetching all economic data
function useEconomicData() {
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
}

// Utility function to filter and format data
const filterDataByCode = (data: DataPoint[], code: string) => {
  return data
    .filter(item => item.codigo === code)
    .sort((a, b) => {
      // Sort by year and month
      const dateA = new Date(parseInt(a.a_o), parseInt(a.mes_no) - 1);
      const dateB = new Date(parseInt(b.a_o), parseInt(b.mes_no) - 1);
      return dateA.getTime() - dateB.getTime();
    });
};

// Loading and Error components
const LoadingState = ({ message }: { message: string }) => (
  <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg">
    <p className="text-gray-600">{message}</p>
  </div>
);

const ErrorState = ({ message }: { message: string }) => (
  <div className="p-4 bg-red-50 rounded-lg">
    <p className="text-red-600">{message}</p>
  </div>
);

// Chart Components
const TRMChart = ({ data }: { data: DataPoint[] }) => {
  const trmData = filterDataByCode(data, IndicatorCode.TRM);

  const chartData = {
    labels: trmData.map(item => `${item.mes}/${item.a_o}`),
    datasets: [{
      label: 'TRM',
      data: trmData.map(item => parseFloat(item.valor_original)),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
      tension: 0.1,
    }],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Tasa Representativa del Mercado (TRM)',
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

const UnemploymentChart = ({ data }: { data: DataPoint[] }) => {
  const unemploymentData = filterDataByCode(data, IndicatorCode.Unemployment);

  const chartData = {
    labels: unemploymentData.map(item => `${item.mes}/${item.a_o}`),
    datasets: [{
      label: 'Tasa de Desempleo',
      data: unemploymentData.map(item => parseFloat(item.valor_original)),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      borderColor: 'rgb(255, 99, 132)',
      tension: 0.1,
    }],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Tasa de Desempleo',
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: 'Porcentaje (%)',
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

// Main Dashboard Component
const EconomicDashboard = () => {
  const { data, loading, error } = useEconomicData();

  if (loading) return <LoadingState message="Cargando datos económicos..." />;
  if (error) return <ErrorState message={error.message} />;
  if (!data.length) return <ErrorState message="No hay datos disponibles" />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
      <div className="p-4 bg-white rounded-lg shadow">
        <TRMChart data={data} />
      </div>
      <div className="p-4 bg-white rounded-lg shadow">
        <UnemploymentChart data={data} />
      </div>
      {/* Add more charts as needed */}
    </div>
  );
};

export default EconomicDashboard;