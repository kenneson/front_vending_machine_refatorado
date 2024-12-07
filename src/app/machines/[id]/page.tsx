"use client";

import React, { useEffect, useState } from "react"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, ArrowLeft } from "lucide-react";
import ProductList from "@/app/components/productList";
import ProductForm from "@/app/components/productForm";
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

interface MachineDetailsProps {
    params: { id: string };
}

const MachineDetails: React.FC<MachineDetailsProps> = ({ params }) => {
    const { id } = params;
    const [machine, setMachine] = useState<Machine | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMachineDetails = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(`https://limpomatic-9617a4f754e1.herokuapp.com/maquina/${id}/produtos`);
                setMachine(response.data);
                setError(null);
            } catch (err) {
                console.error("Erro ao carregar detalhes da máquina:", err);
                setError("Não foi possível carregar os detalhes da máquina. Tente novamente mais tarde.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchMachineDetails();
    }, [id]);

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

    if (!machine) {
        return (
            <div className="p-6">
                <p className="text-center text-gray-500">Máquina não encontrada</p>
            </div>
        );
    }

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center space-x-4">
                <Link href="/machines">
                    <Button variant="outline" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <h1 className="text-2xl font-bold">Detalhes da Máquina</h1>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex justify-between items-start">
                        <div>
                            <CardTitle className="text-2xl">{machine.nomeMaquina}</CardTitle>
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
                <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div>
                            <p className="text-sm text-muted-foreground">ID da Máquina</p>
                            <p className="font-medium">{machine.codUnico}</p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Store ID</p>
                            <p className="font-medium">{machine.storeId}</p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Tipo</p>
                            <p className="font-medium">{machine.tipoMaquina}</p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Último Acesso</p>
                            <p className="font-medium">
                                {machine.ultimoAcesso 
                                    ? formatDate(machine.ultimoAcesso.toString())
                                    : 'Nunca acessado'}
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Tabs defaultValue="products" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="products">Produtos</TabsTrigger>
                    <TabsTrigger value="add-product">Adicionar Produto</TabsTrigger>
                </TabsList>
                <TabsContent value="products">
                    <ProductList machineId={id} />
                </TabsContent>
                <TabsContent value="add-product">
                    <ProductForm machineId={Number(id)} />
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default MachineDetails;
