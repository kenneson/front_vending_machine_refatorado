import { CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { MonitoringDashboard } from '@/features/monitoring/components/MonitoringDashboard';

export default function DashboardPage() {
    return (
        <>
            <CardHeader>
                <CardTitle className="text-3xl font-bold mb-4">
                    Monitoramento de Máquinas
                </CardTitle>
            </CardHeader>
            <CardContent>
                <MonitoringDashboard />
            </CardContent>
        </>
    );
}