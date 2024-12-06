import { CardContent } from "@/components/ui/card";
import { MonitoringDashboard } from "@/features/monitoring/components/MonitoringDashboard";


export default function Home() {
  return (
    <div>
      <CardContent>
        <MonitoringDashboard />
      </CardContent>
    </div>
  );
}
