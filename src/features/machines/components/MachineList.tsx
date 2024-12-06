'use client';

import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import axios from "axios";

interface Machine {
    idMaquina: string;
    nomeMaquina: string;
    online: boolean;
    localizacao?: string;
    ultimaAtualizacao?: string;
}

export const MachineList: React.FC = () => {
    const [machines, setMachines] = useState<Machine[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMachines = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get('https://limpomatic-9617a4f754e1.herokuapp.com/monitoramento');
                setMachines(response.data);
                setError(null);
            } catch (err) {
                console.error("Erro ao carregar máquinas:", err);
                setError("Não foi possível carregar a lista de máquinas. Tente novamente mais tarde.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchMachines();
        // Atualizar a cada 30 segundos
        const interval = setInterval(fetchMachines, 30000);
        return () => clearInterval(interval);
    }, []);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] p-6">
                <p className="text-red-500 text-center mb-4">{error}</p>
                <Button onClick={() => window.location.reload()}>
                    Tentar Novamente
                </Button>
            </div>
        );
    }

    if (machines.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] p-6">
                <p className="text-center mb-4">
                    Nenhuma máquina cadastrada. <br />
                    Adicione uma máquina para começar a monitorar.
                </p>
                <Link href="/dashboard/cadastrarmaquinas">
                    <Button>
                        Adicionar Máquina
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Máquinas</h1>
                <Link href="/dashboard/cadastrarmaquinas">
                    <Button>
                        Adicionar Máquina
                    </Button>
                </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {machines.map((machine) => (
                    <Card key={machine.idMaquina} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <CardTitle className="flex justify-between items-center">
                                <span>{machine.nomeMaquina}</span>
                                <span className={`px-2 py-1 rounded-full text-xs ${
                                    machine.online 
                                        ? 'bg-green-100 text-green-800' 
                                        : 'bg-red-100 text-red-800'
                                }`}>
                                    {machine.online ? "Online" : "Offline"}
                                </span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {machine.localizacao && (
                                <p className="text-sm text-gray-500 mb-4">
                                    Localização: {machine.localizacao}
                                </p>
                            )}
                            <div className="flex justify-between items-center">
                                <Link href={`/dashboard/machines/${machine.idMaquina}`}>
                                    <Button variant="outline">Ver Detalhes</Button>
                                </Link>
                                {machine.ultimaAtualizacao && (
                                    <span className="text-xs text-gray-400">
                                        Última atualização: {new Date(machine.ultimaAtualizacao).toLocaleString()}
                                    </span>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};
