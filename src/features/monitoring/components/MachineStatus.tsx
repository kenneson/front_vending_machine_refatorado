'use client';

import { Machine } from '../types';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '../utils';
import { memo } from 'react';

interface MachineStatusProps {
    machines: Machine[];
}

export const MachineStatus = memo<MachineStatusProps>(({ machines }) => {
    console.log('MachineStatus - Received machines:', machines);

    if (!machines || machines.length === 0) {
        return (
            <section className="p-6">
                <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-primary">Status das Máquinas</h1>
                <div className="text-center text-gray-500">
                    Nenhuma máquina encontrada
                </div>
            </section>
        );
    }

    return (
        <section className="p-6">
            <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-primary">Status das Máquinas</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto max-w-screen-lg">
                {machines.map((machine) => {
                    console.log('Rendering machine:', machine);
                    return (
                        <Card key={machine.idMaquina} className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <CardTitle className="text-xl">{machine.nomeMaquina || 'Sem nome'}</CardTitle>
                                        <CardDescription className="mt-1">
                                            {machine.descricao || 'Sem descrição'}
                                        </CardDescription>
                                    </div>
                                    <Badge 
                                        variant={machine.status === 'ONLINE' ? 'default' : 'destructive'}
                                        className="ml-2"
                                    >
                                        {machine.status || 'OFFLINE'}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <p className="text-muted-foreground">ID</p>
                                        <p className="font-medium">{machine.codUnico || 'N/A'}</p>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground">Produtos</p>
                                        <p className="font-medium">{machine.numProdutos || 0}</p>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground">Tipo</p>
                                        <p className="font-medium">{machine.tipoMaquina || 'N/A'}</p>
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
                    );
                })}
            </div>
        </section>
    );
}, (prevProps, nextProps) => {
    // Só re-renderiza se houver mudança real nos dados das máquinas
    return JSON.stringify(prevProps.machines) === JSON.stringify(nextProps.machines);
});

MachineStatus.displayName = 'MachineStatus';
