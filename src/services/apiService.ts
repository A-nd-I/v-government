// services/apiService.ts
import axios from 'axios';

const API_URL = 'https://www.datos.gov.co/resource/m5ti-ecrw.json';

// Define la estructura de los datos según el formato del API
export interface EconomicIndicator {
  codigo: string;
  indicador: string;
  mes_no: string;
  a_o: string;
  mes: string;
  categoria: string;
  valor_original: string;
}

export const fetchEconomicIndicators = async (): Promise<EconomicIndicator[]> => {
  try {
    const response = await axios.get<EconomicIndicator[]>(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching economic indicators:', error);
    return [];
  }
};
