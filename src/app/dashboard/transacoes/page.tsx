import { CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import TransacoesPage from '@/app/components/transacoes';

export default function TransacoesRoute() {
    return (
        <>
            <CardHeader>
                <CardTitle className="text-3xl font-bold mb-4">
                    Transações
                </CardTitle>
            </CardHeader>
            <CardContent>
                <TransacoesPage />
            </CardContent>
        </>
    );
}