import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

const ProductForm: React.FC<{ machineId: number }> = ({ machineId }) => {
    const [formData, setFormData] = useState({
        nome: "",
        descricao: "",
        valorUnitario: "",
        medidaUnitaria: "",
        posicaoMaquina: "",
        imgFoto: "",
        estoque: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Converte os campos que precisam ser números
            const dataToSend = {
                ...formData,
                idMaquina: parseInt(String(machineId), 10),
                estoque: parseInt(formData.estoque, 10), // Converte estoque para número inteiro
                valorUnitario: parseFloat(formData.valorUnitario), // Converte valorUnitario para número
                medidaUnitaria: parseInt(formData.medidaUnitaria, 10), // Converte medidaUnitaria para número
                posicaoMaquina: parseInt(formData.posicaoMaquina, 10), // Converte posicaoMaquina para número
            };
            await axios.post(`https://limpomatic-9617a4f754e1.herokuapp.com/api-criar-produto`, dataToSend);

            toast({
                title: "Produto cadastrado com sucesso!",
                description: `O produto "${formData.nome}" foi adicionado.`,
            });

            // Limpar formulário após submissão
            setFormData({
                nome: "",
                descricao: "",
                valorUnitario: "",
                medidaUnitaria: "",
                posicaoMaquina: "",
                imgFoto: "",
                estoque: "",
            });
        } catch (error) {
            console.error("Erro ao cadastrar produto:", error);
            toast({
                title: "Erro ao cadastrar produto",
                description: "Tente novamente mais tarde.",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="mt-6">
            <h2 className="text-xl font-bold mb-4">Adicionar Produto</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <Label htmlFor="nome">Nome do Produto</Label>
                    <Input
                        id="nome"
                        name="nome"
                        value={formData.nome}
                        onChange={handleChange}
                        placeholder="Ex.: Chocolate"
                        required
                    />
                </div>
                <div>
                    <Label htmlFor="descricao">Descrição</Label>
                    <Input
                        id="descricao"
                        name="descricao"
                        value={formData.descricao}
                        onChange={handleChange}
                        placeholder="Ex.: Barrinha de 20g"
                    />
                </div>
                <div>
                    <Label htmlFor="valorUnitario">Valor Unitário (R$)</Label>
                    <Input
                        id="valorUnitario"
                        name="valorUnitario"
                        type="number"
                        step="0.01"
                        value={formData.valorUnitario}
                        onChange={handleChange}
                        placeholder="Ex.: 2.50"
                        required
                    />
                </div>
                <div>
                    <Label htmlFor="medidaUnitaria">Medida Unitaria (g/ml)</Label>
                    <Input
                        id="medidaUnitaria"
                        name="medidaUnitaria"
                        type="number"
                        step="1"
                        value={formData.medidaUnitaria}
                        onChange={handleChange}
                        placeholder="Ex.: 200"
                        required
                    />
                </div>
                <div>
                    <Label htmlFor="posicaoMaquina">Posição na Máquina</Label>
                    <Input
                        id="posicaoMaquina"
                        name="posicaoMaquina"
                        type="number"
                        value={formData.posicaoMaquina}
                        onChange={handleChange}
                        placeholder="Ex.: 1"
                        required
                    />
                </div>
                <div>
                    <Label htmlFor="imgFoto">URL da Imagem</Label>
                    <Input
                        id="imgFoto"
                        name="imgFoto"
                        value={formData.imgFoto}
                        onChange={handleChange}
                        placeholder="Ex.: https://example.com/imagem.jpg"
                    />
                </div>
                <div>
                    <Label htmlFor="estoque">Estoque Inicial</Label>
                    <Input
                        id="estoque"
                        name="estoque"
                        type="number"
                        value={formData.estoque}
                        onChange={handleChange}
                        placeholder="Ex.: 100"
                        required
                    />
                </div>
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Cadastrando..." : "Cadastrar Produto"}
                </Button>
            </form>
        </div>
    );
};

export default ProductForm;
