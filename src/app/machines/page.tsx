'use client';
import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import axios from "axios";
import Link from "next/link";
import { formatDate } from "@/features/monitoring/utils";

interface Machine {
    idMaquina: number;
    nomeMaquina: string;
    descricao?: string;
    codUnico: string;
    tipoMaquina: string;
    numProdutos: number;
    storeId: string;
    ultimoAcesso?: Date;
    status: 'ONLINE' | 'OFFLINE';
}

const MachineList: React.FC = () => {
    const [machines, setMachines] = useState<Machine[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMachines = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get("https://limpomatic-9617a4f754e1.herokuapp.com/api-obter-maquinas");
                console.log('Response data:', response.data); // Debug log
                if (response.data && Array.isArray(response.data)) {
                    setMachines(response.data);
                } else if (response.data && response.data.maquinas) {
                    setMachines(response.data.maquinas);
                } else {
                    console.error("Formato de dados inesperado:", response.data);
                    setError("Formato de dados inesperado da API");
                }
                setError(null);
            } catch (err) {
                console.error("Erro ao carregar máquinas:", err);
                setError("Não foi possível carregar as máquinas. Tente novamente mais tarde.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchMachines();
    }, []);


    if (isLoading) {
        return (
            <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6">
                <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                    <div className="flex items-center space-x-2">
                        <svg
                            className="h-5 w-5 text-red-500"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <p className="text-sm font-medium text-red-800">{error}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Máquinas</h1>
                <Button variant="outline">Adicionar Máquina</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {machines.map((machine) => (
                    <Link 
                        href={`/machines/${machine.idMaquina}`} 
                        key={machine.idMaquina}
                        className="transition-transform hover:scale-[1.02]"
                    >
                        <Card className="h-full">
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <CardTitle className="text-xl">{machine.nomeMaquina}</CardTitle>
                                        <CardDescription className="mt-1.5">
                                            {machine.descricao || 'Sem descrição'}
                                        </CardDescription>
                                    </div>
                                    <Badge 
                                        variant={machine.status === 'ONLINE' ? 'default' : 'destructive'}
                                        className="ml-2"
                                    >
                                        {machine.status}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <p className="text-muted-foreground">ID da Máquina</p>
                                        <p className="font-medium">{machine.codUnico}</p>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground">Produtos</p>
                                        <p className="font-medium">{machine.numProdutos}</p>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground">Tipo</p>
                                        <p className="font-medium">{machine.tipoMaquina}</p>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground">Último Acesso</p>
                                        <p className="font-medium">
                                            {machine.ultimoAcesso 
                                                ? formatDate(machine.ultimoAcesso.toString())
                                                : 'Nunca acessado'}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default MachineList;
