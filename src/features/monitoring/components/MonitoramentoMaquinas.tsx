'use client';
import { useEffect, useState } from 'react';
import { Machine } from '../types';
import { getMachines } from '../api';

export default function MonitoramentoMaquinas() {
  const [maquinas, setMaquinas] = useState<Machine[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMaquinas = async () => {
      try {
        const data = await getMachines();
        setMaquinas(data);
      } catch (err) {
        setError('Erro ao carregar dados das máquinas');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMaquinas();
    
    // Atualiza os dados a cada 30 segundos
    const interval = setInterval(fetchMaquinas, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="grid gap-4">
      {maquinas.map((maquina) => (
        <div 
          key={maquina.idMaquina}
          className={`p-4 rounded-lg ${
            maquina.status === 'ONLINE' ? 'bg-green-100' : 'bg-red-100'
          }`}
        >
          <h3 className="font-bold">{maquina.nomeMaquina}</h3>
          <p>Status: {maquina.status}</p>
          <p>Tipo: {maquina.tipoMaquina}</p>
          <p>Produtos: {maquina.numProdutos}</p>
          <p>Último acesso: {new Date(maquina.ultimoAcesso).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}
