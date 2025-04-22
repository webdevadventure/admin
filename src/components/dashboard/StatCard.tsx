
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  description?: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  className?: string;
}

const StatCard = ({
  title,
  value,
  icon,
  description,
  trend,
  trendValue,
  className,
}: StatCardProps) => {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-gray-500 font-medium mb-1">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
            {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
            
            {trend && trendValue && (
              <div className="flex items-center gap-1 mt-2">
                <span
                  className={cn(
                    "text-xs font-medium",
                    trend === "up" && "text-green-600",
                    trend === "down" && "text-red-600",
                    trend === "neutral" && "text-gray-600"
                  )}
                >
                  {trendValue}
                </span>
                
                <span
                  className={cn(
                    "text-xs",
                    trend === "up" && "text-green-600",
                    trend === "down" && "text-red-600",
                    trend === "neutral" && "text-gray-500"
                  )}
                >
                  so với tháng trước
                </span>
              </div>
            )}
          </div>
          
          <div className="p-2 rounded-md bg-blue-50">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
