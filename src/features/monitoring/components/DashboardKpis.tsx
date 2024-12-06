'use client';

import { Transaction, Machine } from '../types';
import { calculateKpis } from '../utils/kpi';
import { KpiCard } from './KpiCard';
import { 
    BanknoteIcon, 
    BarChart3Icon, 
    SignalIcon, 
    ActivityIcon 
} from 'lucide-react';

interface DashboardKpisProps {
    transactions: Transaction[];
    machines: Machine[];
}

export const DashboardKpis: React.FC<DashboardKpisProps> = ({
    transactions,
    machines
}) => {
    const kpis = calculateKpis(transactions, machines);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
            <KpiCard
                title="Vendas do Mês"
                value={kpis.monthlySales}
                description="Total de vendas do mês atual"
                icon={<BanknoteIcon className="h-4 w-4 sm:h-5 sm:w-5" />}
            />
            <KpiCard
                title="Transações do Mês"
                value={kpis.monthlyTransactions}
                description="Número de transações este mês"
                icon={<BarChart3Icon className="h-4 w-4 sm:h-5 sm:w-5" />}
            />
            <KpiCard
                title="Disponibilidade"
                value={kpis.machineAvailability}
                description={`Máquinas online: ${kpis.onlineMachines}`}
                icon={<SignalIcon className="h-4 w-4 sm:h-5 sm:w-5" />}
            />
            <KpiCard
                title="Média por Máquina"
                value={kpis.averageSalesPerMachine}
                description="Média de vendas por máquina este mês"
                icon={<ActivityIcon className="h-4 w-4 sm:h-5 sm:w-5" />}
            />
        </div>
    );
};
