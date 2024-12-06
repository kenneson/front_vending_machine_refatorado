export interface Machine {
    idMaquina: number;
    nomeMaquina: string;
    descricao?: string;
    codUnico: string;
    tipoMaquina: string;
    numProdutos: number;
    idDono: number;
    storeId: string;
    ultimoAcesso?: Date;
    status: 'ONLINE' | 'OFFLINE';
}

export interface Transaction {
    id: string;
    valor: number;
    tipo: string;
    data: string;
    descricao: string;
    storeId: string;
    machine?: Machine; 
}
