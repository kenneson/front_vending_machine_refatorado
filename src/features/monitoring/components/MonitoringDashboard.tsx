'use client';

import { useEffect, useState } from 'react';
import { Machine, Transaction } from '../types';
import { getMachines, getTransactions } from '../api';
import { MachineStatus } from './MachineStatus';
import { TransactionList } from './TransactionList';
import { DashboardKpis } from './DashboardKpis';

export const MonitoringDashboard = () => {
    const [machines, setMachines] = useState<Machine[]>([]);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [allTransactions, setAllTransactions] = useState<Transaction[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMachines = async () => {
            try {
                const data = await getMachines();
                // Só atualiza se houver mudança real nos dados
                setMachines(prevMachines => {
                    const hasChanges = JSON.stringify(prevMachines) !== JSON.stringify(data);
                    return hasChanges ? (data || []) : prevMachines;
                });
                setError(null);
            } catch (error) {
                console.error('Error fetching machines:', error);
                setError('Erro ao carregar as máquinas');
            }
        };

        // Primeira chamada com loading
        const initialFetch = async () => {
            setIsLoading(true);
            await fetchMachines();
            setIsLoading(false);
        };
        initialFetch();

        // Atualizações em background
        const interval = setInterval(fetchMachines, 3000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const data = await getTransactions();
                const sortedTransactions = data.sort(
                    (a, b) => new Date(b.data).getTime() - new Date(a.data).getTime()
                );
                setAllTransactions(sortedTransactions);
                setTransactions(sortedTransactions.slice(0, 10));
            } catch (error) {
                console.error('Error fetching transactions:', error);
            }
        };

        fetchTransactions();
    }, []);

    const handleLoadMore = () => {
        const nextCount = transactions.length + 10;
        setTransactions(allTransactions.slice(0, nextCount));
    };

    const handleLoadLess = () => {
        setTransactions(allTransactions.slice(0, 10));
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6 text-center text-red-500">
                {error}
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-6 space-y-6 max-w-7xl">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <DashboardKpis 
                    transactions={allTransactions} 
                    machines={machines} 
                />
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <MachineStatus machines={machines} />
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
                <TransactionList 
                    transactions={transactions}
                    onLoadMore={handleLoadMore}
                    onLoadLess={handleLoadLess}
                    showLoadLess={transactions.length > 10}
                />
            </div>
        </div>
    );
};
