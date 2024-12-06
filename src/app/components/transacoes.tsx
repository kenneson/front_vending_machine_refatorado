'use client'

import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

interface Transacao {
    id: string;
    valor: number;
    tipo: string;
    data: string;
    descricao: string;
    storeId: string;
}

const maquinasMap: Record<string, string> = {
    '60591521': 'LimpoMatic (Maq01)',
    '61663393': 'VendingPaper (maq02)',
    // Adicione aqui outros mapeamentos conforme necessário
};

const TransacoesPage: React.FC = () => {
    const [transacoes, setTransacoes] = useState<Transacao[]>([]);
    const [transacoesCompletas, setTransacoesCompletas] = useState<Transacao[]>([]);

    useEffect(() => {
        fetch('https://limpomatic-9617a4f754e1.herokuapp.com/transacoes')
            .then(response => response.json())
            .then((data: Transacao[]) => {
                console.log("Dados recebidos:", data);
                const transacoesOrdenadas = data.sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());
                setTransacoesCompletas(transacoesOrdenadas);
                setTransacoes(transacoesOrdenadas.slice(0, 10));
            })
            .catch(error => {
                console.error('Erro ao buscar transações:', error);
            });
    }, []);

    const carregarMaisTransacoes = () => {
        setTransacoes(prevTransacoes => {
            const proximosRegistros = prevTransacoes.length + 10;
            return transacoesCompletas.slice(0, proximosRegistros);
        });
    };

    const carregarMenosTransacoes = () => {
        setTransacoes(transacoesCompletas.slice(0, 10));
    };

    const formatDate = (dateString: string): string => {
        const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR', options);
    };

    const formatCurrency = (value: number): string => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
    };

    return (
        <div className="container mx-auto flex flex-col justify-center p-4">
            <h2 className="text-3xl font-bold mb-4 text-center">Transações</h2>
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Valor</TableHead>
                            <TableHead>Tipo</TableHead>
                            <TableHead>Data</TableHead>
                            <TableHead>Descrição</TableHead>
                            <TableHead>Máquina</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {transacoes.map(transacao => (
                            <TableRow key={transacao.id}>
                                <TableCell>{transacao.id}</TableCell>
                                <TableCell>{formatCurrency(transacao.valor)}</TableCell>
                                <TableCell>{transacao.tipo}</TableCell>
                                <TableCell>{formatDate(transacao.data)}</TableCell>
                                <TableCell>{transacao.descricao}</TableCell>
                                <TableCell>{maquinasMap[transacao.storeId]}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            {transacoesCompletas.length > 10 && (
                <div className="flex justify-center mt-4">
                    {transacoes.length < transacoesCompletas.length ? (
                        <Button onClick={carregarMaisTransacoes} variant="default">
                            Mostrar Mais
                        </Button>
                    ) : (
                        <Button onClick={carregarMenosTransacoes} variant="destructive">
                            Mostrar Menos
                        </Button>
                    )}
                </div>
            )}
            <p className="mt-2 text-gray-500 text-center">{`Total de transações: ${transacoesCompletas.length}`}</p>
        </div>
    );
};

export default TransacoesPage;