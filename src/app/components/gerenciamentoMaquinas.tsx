'use client';
import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Link from "next/link";

// Define the interface for a machine object
interface Machine {
    idMaquina: number;
    nomeMaquina: string;
    online: boolean;
}

const MachineList: React.FC = () => {
    // Update the state to use the Machine interface
    const [machines, setMachines] = useState<Machine[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setIsLoading(true);
        axios
            .get("/api-obter-maquinas")
            .then((res) => {
                setMachines(res.data.maquinas);
            })
            .catch((err) => {
                console.error("Erro ao carregar máquinas:", err);
                setError("Erro ao carregar máquinas.");
            })
            .finally(() => setIsLoading(false));
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Máquinas</h1>
            {isLoading ? (
                <p>Carregando...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {machines.map((machine) => (
                        <Card key={machine.idMaquina}>
                            <CardHeader>
                                <CardTitle>{machine.nomeMaquina}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>Status: {machine.online ? "Online" : "Offline"}</p>
                                <Link href={`/machines/${machine.idMaquina}`}>
                                    <Button>Detalhes</Button>
                                </Link>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MachineList;
