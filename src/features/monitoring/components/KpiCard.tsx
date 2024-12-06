'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface KpiCardProps {
    title: string;
    value: string | number;
    description?: string;
    icon?: React.ReactNode;
}

export const KpiCard: React.FC<KpiCardProps> = ({
    title,
    value,
    description,
    icon
}) => {
    return (
        <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm sm:text-base font-medium">
                    {title}
                </CardTitle>
                {icon && (
                    <div className="text-muted-foreground">
                        {icon}
                    </div>
                )}
            </CardHeader>
            <CardContent>
                <div className="text-xl sm:text-2xl font-bold">{value}</div>
                {description && (
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                        {description}
                    </p>
                )}
            </CardContent>
        </Card>
    );
};
