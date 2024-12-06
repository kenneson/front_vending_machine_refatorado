import { MachineList } from "@/features/machines/components/MachineList";
import { Card } from "@/components/ui/card";

export default function GerenciamentoMaquinasPage() {
    return (
        <Card className="p-6">
            <MachineList />
        </Card>
    );
}
