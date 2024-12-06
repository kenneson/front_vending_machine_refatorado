'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { Check, X, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface FormInputs {
    nomeMaquina: string;
    descricao: string;
    codUnico: string;
    tipoMaquina: string;
    numProdutos: number;
    idDono: number;
    storeId: string;
}

export default function CreateMachineForm() {
    const { register, handleSubmit, reset, setValue } = useForm<FormInputs>();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = React.useState(false);
    const [showSuccess, setShowSuccess] = React.useState(false);

    React.useEffect(() => {
        if (showSuccess) {
            const timer = setTimeout(() => setShowSuccess(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [showSuccess]);

    const onSubmit = async (data: FormInputs) => {
        // Ensure numProdutos is a number
        data.numProdutos = Number(data.numProdutos);
        data.idDono = Number(data.idDono);

        setIsLoading(true);
        setShowSuccess(false);

        try {
            const response = await fetch('https://limpomatic-9617a4f754e1.herokuapp.com/criar-maquinas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                toast({
                    title: 'Sucesso',
                    description: 'Máquina cadastrada com sucesso',
                    variant: 'default',
                });
                reset();
                setShowSuccess(true);
            } else {
                const errorData = await response.json();
                toast({
                    title: 'Erro',
                    description: errorData.error || 'Erro ao cadastrar máquina',
                    variant: 'error',
                });
            }
        } catch (error) {
            console.error('Erro ao cadastrar máquina:', error);
            toast({
                title: 'Erro',
                description: 'Erro interno ao cadastrar máquina',
                variant: 'error',
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            {showSuccess && (
                <Alert className="bg-emerald-50 dark:bg-emerald-900/30 border-emerald-200 dark:border-emerald-900">
                    <AlertCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    <AlertDescription className="text-emerald-600 dark:text-emerald-400">
                        Máquina criada com sucesso!
                    </AlertDescription>
                </Alert>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="nomeMaquina">Nome da Máquina</Label>
                        <Input
                            id="nomeMaquina"
                            placeholder="Digite o nome da máquina"
                            {...register('nomeMaquina', { required: true })}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="codUnico">Código Único</Label>
                        <Input
                            id="codUnico"
                            placeholder="Digite o código único"
                            {...register('codUnico', { required: true })}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="tipoMaquina">Tipo de Máquina</Label>
                        <Select onValueChange={(value) => setValue('tipoMaquina', value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Selecione o tipo" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="vending">Vending Machine</SelectItem>
                                <SelectItem value="other">Outro</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="numProdutos">Quantidade de Produtos</Label>
                        <Input
                            id="numProdutos"
                            type="number"
                            placeholder="Digite a quantidade"
                            {...register('numProdutos', { required: true, min: 1 })}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="idDono">ID do Dono</Label>
                        <Input
                            id="idDono"
                            type="number"
                            placeholder="Digite o ID do dono"
                            {...register('idDono', { required: true })}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="storeId">Store ID</Label>
                        <Input
                            id="storeId"
                            placeholder="Digite o Store ID"
                            {...register('storeId', { required: true })}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="descricao">Descrição</Label>
                        <Textarea
                            id="descricao"
                            placeholder="Digite a descrição da máquina"
                            {...register('descricao', { required: true })}
                            className="min-h-[100px]"
                        />
                    </div>
                </div>

                <div className="flex justify-end space-x-4">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => reset()}
                        disabled={isLoading}
                    >
                        <X className="mr-2 h-4 w-4" />
                        Limpar
                    </Button>
                    <Button
                        type="submit"
                        disabled={isLoading}
                    >
                        <Check className="mr-2 h-4 w-4" />
                        {isLoading ? 'Criando...' : 'Criar Máquina'}
                    </Button>
                </div>
            </form>
        </div>
    );
}