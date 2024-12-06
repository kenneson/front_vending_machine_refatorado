import { Transaction, Machine } from '../types';
import { formatCurrency } from '../utils';

export const calculateKpis = (transactions: Transaction[], machines: Machine[]) => {
    const today = new Date();
    
    // Transações do mês atual
    const monthlyTransactions = transactions.filter(t => {
        const transactionDate = new Date(t.data);
        return transactionDate.getMonth() === today.getMonth() &&
               transactionDate.getFullYear() === today.getFullYear();
    });

    // Total de vendas do mês
    const monthlySales = monthlyTransactions.reduce((acc, t) => acc + t.valor, 0);

    // Máquinas online
    const onlineMachines = machines.filter(m => m.status === 'ONLINE').length;
    const totalMachines = machines.length;
    const machineAvailability = totalMachines ? (onlineMachines / totalMachines) * 100 : 0;

    // Média de vendas por máquina no mês
    const averageSalesPerMachine = totalMachines ? monthlySales / totalMachines : 0;

    return {
        monthlySales: formatCurrency(monthlySales),
        monthlyTransactions: monthlyTransactions.length,
        machineAvailability: `${machineAvailability.toFixed(1)}%`,
        onlineMachines: `${onlineMachines}/${totalMachines}`,
        averageSalesPerMachine: formatCurrency(averageSalesPerMachine)
    };
};
