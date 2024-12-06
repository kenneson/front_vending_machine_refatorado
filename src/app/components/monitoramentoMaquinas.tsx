'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Maquina {
    nome: string;
    status: 'ONLINE' | 'OFFLINE';
}

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
    // Adicione outros mapeamentos conforme necessário
};

const MonitoramentoTransacoes: React.FC = () => {
    const [maquinas, setMaquinas] = useState<Maquina[]>([]);
    const [transacoes, setTransacoes] = useState<Transacao[]>([]);
    const [transacoesCompletas, setTransacoesCompletas] = useState<Transacao[]>([]);

    useEffect(() => {
        const fetchMaquinas = async () => {
            try {
                const response = await axios.get<Maquina[]>('https://limpomatic-9617a4f754e1.herokuapp.com/monitoramento');
                console.log("Dados das máquinas:", response.data);
                setMaquinas(response.data);
            } catch (error) {
                console.error('Erro ao buscar dados das máquinas:', error);
            }
        };

        fetchMaquinas();
        const interval = setInterval(fetchMaquinas, 8000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const fetchTransacoes = async () => {
            try {
                const response = await axios.get<Transacao[]>('https://limpomatic-9617a4f754e1.herokuapp.com/transacoes');
                console.log("Transações:", response.data);
                const transacoesOrdenadas = response.data.sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());
                setTransacoesCompletas(transacoesOrdenadas);
                setTransacoes(transacoesOrdenadas.slice(0, 10));
            } catch (error) {
                console.error('Erro ao buscar transações:', error);
            }
        };

        fetchTransacoes();
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
        <div className="container mx-auto p-4 space-y-8">
            {/* Monitoramento de Máquinas */}
            <section>
                <h1 className="text-3xl font-bold mb-4 text-center">Status das Máquinas</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mx-auto max-w-screen-lg">
                    {maquinas.map((maquina, index) => (
                        <div key={index} className={`p-4 rounded ${maquina.status === 'ONLINE' ? 'bg-green-100' : 'bg-red-100'}`}>
                            <h2 className="text-lg font-bold">{maquina.nome}</h2>
                            <p className={`font-bold ${maquina.status === 'ONLINE' ? 'text-green-600' : 'text-red-600'}`}>
                                Status: {maquina.status}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Transações */}
            <section>
                <h2 className="text-3xl font-bold mb-4 text-center">Transações</h2>
                <div className="overflow-x-auto max-w-screen-lg mx-auto">
                    <table className="min-w-full border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="px-4 py-2 border-b">ID</th>
                                <th className="px-4 py-2 border-b">Valor</th>
                                <th className="px-4 py-2 border-b">Tipo</th>
                                <th className="px-4 py-2 border-b">Data</th>
                                <th className="px-4 py-2 border-b">Descrição</th>
                                <th className="px-4 py-2 border-b">Máquina</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transacoes.map(transacao => (
                                <tr key={transacao.id}>
                                    <td className="px-4 py-2 border-b">{transacao.id}</td>
                                    <td className="px-4 py-2 border-b">{formatCurrency(transacao.valor)}</td>
                                    <td className="px-4 py-2 border-b">{transacao.tipo}</td>
                                    <td className="px-4 py-2 border-b">{formatDate(transacao.data)}</td>
                                    <td className="px-4 py-2 border-b">{transacao.descricao}</td>
                                    <td className="px-4 py-2 border-b">{maquinasMap[transacao.storeId] || 'Desconhecida'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {transacoesCompletas.length > 10 && (
                    <div className="flex justify-center mt-4">
                        {transacoes.length < transacoesCompletas.length ? (
                            <button onClick={carregarMaisTransacoes} className="px-4 py-2 bg-blue-500 text-white rounded">
                                Mostrar Mais
                            </button>
                        ) : (
                            <button onClick={carregarMenosTransacoes} className="px-4 py-2 bg-red-500 text-white rounded">
                                Mostrar Menos
                            </button>
                        )}
                    </div>
                )}
                <p className="mt-2 text-gray-500 text-center">{`Total de transações: ${transacoesCompletas.length}`}</p>
            </section>
        </div>
    );
};

export default MonitoramentoTransacoes;
