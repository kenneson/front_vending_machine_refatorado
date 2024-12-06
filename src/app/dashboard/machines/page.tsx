import { CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import MachineProductManagement from '@/app/components/gerenciamentoMaquinas';

export default function MachinesRoute() {
    return (
        <>
            <CardHeader>
                <CardTitle className="text-3xl font-bold mb-4">
                    Gerenciamento de Máquinas
                </CardTitle>
            </CardHeader>
            <CardContent>
                <MachineProductManagement />
            </CardContent>
        </>
    );
}