import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import axios from "axios";

interface Product {
    id: number;
    nome: string;
    estoque: number;
}

const ProductList: React.FC<{ machineId: string }> = ({ machineId }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios
            .get(`https://limpomatic-9617a4f754e1.herokuapp.com/api-consultar-produtos/${machineId}`)
            .then((res) => setProducts(res.data))
            .catch((err) => console.error("Erro ao carregar produtos:", err))
            .finally(() => setIsLoading(false));
    }, [machineId]);

    return (
        <div>
            <h2 className="text-xl font-bold mt-4 mb-2">Produtos</h2>
            {isLoading ? (
                <p>Carregando...</p>
            ) : (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Nome</TableHead>
                            <TableHead>Estoque</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell>{product.id}</TableCell>
                                <TableCell>{product.nome}</TableCell>
                                <TableCell>{product.estoque}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </div>
    );
};

export default ProductList;
