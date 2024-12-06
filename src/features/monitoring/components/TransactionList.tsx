'use client';

import { Transaction, Machine } from '../types';
import { formatDate, formatCurrency, fetchMachines } from '../utils';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from 'react';

interface TransactionListProps {
    transactions: Transaction[];
    onLoadMore: () => void;
    onLoadLess: () => void;
    showLoadLess: boolean;
}

export const TransactionList: React.FC<TransactionListProps> = ({
    transactions,
    onLoadMore,
    onLoadLess,
    showLoadLess
}) => {
    const [isMobile, setIsMobile] = useState(false);
    const [machines, setMachines] = useState<Machine[]>([]);

    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 768); // 768px é o breakpoint md do Tailwind
        };

        checkIfMobile();
        window.addEventListener('resize', checkIfMobile);

        return () => window.removeEventListener('resize', checkIfMobile);
    }, []);

    useEffect(() => {
        const loadMachines = async () => {
            const machineData = await fetchMachines();
            setMachines(machineData);
        };

        loadMachines();
    }, []);

    const getMachineName = (storeId: string) => {
        const machine = machines.find(m => m.storeId === storeId);
        return machine ? machine.nomeMaquina : `Máquina ${storeId}`;
    };

    return (
        <div className="w-full space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Últimas Transações</h2>
            </div>

            {isMobile ? (
                // Mobile View
                <div className="space-y-4">
                    {transactions.map((transaction) => (
                        <Card key={transaction.id}>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-base font-semibold flex justify-between items-center">
                                    <span className="text-sm">{formatDate(transaction.data)}</span>
                                    <span className="text-sm font-bold text-green-600">{formatCurrency(transaction.valor)}</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-2">
                                    <div className="grid grid-cols-[100px_1fr] items-center">
                                        <span className="text-sm font-medium text-muted-foreground">Máquina:</span>
                                        <span className="text-sm font-medium">{getMachineName(transaction.storeId)}</span>
                                    </div>
                                    <div className="grid grid-cols-[100px_1fr] items-center">
                                        <span className="text-sm font-medium text-muted-foreground">Tipo:</span>
                                        <span className="text-sm font-medium">{transaction.tipo}</span>
                                    </div>
                                    <div className="grid grid-cols-[100px_1fr] items-center">
                                        <span className="text-sm font-medium text-muted-foreground">Descrição:</span>
                                        <span className="text-sm font-medium break-words">{transaction.descricao}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : (
                // Desktop View
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[180px]">Data</TableHead>
                                <TableHead>Máquina</TableHead>
                                <TableHead>Tipo</TableHead>
                                <TableHead className="text-right">Valor</TableHead>
                                <TableHead>Descrição</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {transactions.map((transaction) => (
                                <TableRow key={transaction.id}>
                                    <TableCell className="font-medium">
                                        {formatDate(transaction.data)}
                                    </TableCell>
                                    <TableCell>{getMachineName(transaction.storeId)}</TableCell>
                                    <TableCell>{transaction.tipo}</TableCell>
                                    <TableCell className="text-right text-green-600">
                                        {formatCurrency(transaction.valor)}
                                    </TableCell>
                                    <TableCell>{transaction.descricao}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}

            <div className="flex justify-center gap-2 pt-4">
                {showLoadLess && (
                    <Button 
                        onClick={onLoadLess} 
                        variant="outline" 
                        size="sm"
                    >
                        Mostrar Menos
                    </Button>
                )}
                <Button 
                    onClick={onLoadMore} 
                    variant="outline" 
                    size="sm"
                >
                    Carregar Mais
                </Button>
            </div>
        </div>
    );
};
