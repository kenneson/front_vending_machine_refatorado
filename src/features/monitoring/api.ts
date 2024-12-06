import axios from 'axios';
import { Machine, Transaction } from './types';

const BASE_URL = 'https://limpomatic-9617a4f754e1.herokuapp.com';

interface MachinesResponse {
    maquinas: Machine[];
}

interface TransactionsResponse {
    transacoes: Transaction[];
}

export const getMachines = async (): Promise<Machine[]> => {
    try {
        console.log('Fetching machines from:', `${BASE_URL}/monitoramento`);
        const response = await axios.get(`${BASE_URL}/monitoramento`);
        console.log('Raw response:', response);
        console.log('Machine status values:', response.data.map((m: { idMaquina: any; status: any; }) => ({ id: m.idMaquina, status: m.status })));
        
        if (Array.isArray(response.data)) {
            return response.data.map(machine => ({
                idMaquina: machine.idMaquina,
                nomeMaquina: machine.nomeMaquina || machine.nome,
                descricao: machine.descricao || `Máquina ${machine.codUnico || ''}`,
                status: machine.status || 'OFFLINE',
                codUnico: machine.codUnico,
                tipoMaquina: machine.tipoMaquina || 'Vending Machine',
                ultimoAcesso: machine.ultimoAcesso || new Date().toISOString(),
                numProdutos: machine.numProdutos || 0,
                storeId: machine.storeId,
                idDono: machine.idDono || null,
            }));
        }
        
        return [];
    } catch (error) {
        console.error('Error fetching machines:', error);
        return [];
    }
};

export const getTransactions = async (): Promise<Transaction[]> => {
    try {
        console.log('Fetching transactions from:', `${BASE_URL}/transacoes`);
        const response = await axios.get<TransactionsResponse>(`${BASE_URL}/transacoes`);
        console.log('Transactions response:', response.data); // Log the entire response for debugging
        
        if (Array.isArray(response.data)) {
            console.log('Transactions data is an array:', response.data); // Log if data is an array
            return response.data;
        }
        
        if (response.data && typeof response.data === 'object') {
            const data = response.data as TransactionsResponse;
            if ('transacoes' in data) {
                console.log('Transactions data:', data.transacoes); // Log the transactions data
                return data.transacoes;
            }
        }

        console.error('Unexpected transactions data format:', response.data);
        return [];
    } catch (error) {
        console.error('Failed to fetch transactions:', error);
        if (axios.isAxiosError(error)) {
            console.error('Response data:', error.response?.data);
            console.error('Response status:', error.response?.status);
        }
        throw error;
    }
};
