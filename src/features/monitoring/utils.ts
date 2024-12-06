import { Machine } from './types';

export const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

export const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
};

export const fetchMachines = async (): Promise<Machine[]> => {
    try {
        const response = await fetch('/api-obter-maquinas');
        const data = await response.json();
        return data.maquinas;
    } catch (error) {
        console.error('Erro ao buscar máquinas:', error);
        return [];
    }
};
