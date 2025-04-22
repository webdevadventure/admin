
import { Check, Edit, MessageCircle, Plus, User, X } from "lucide-react";
import { recentActivities } from "@/lib/mockData";

const iconMap: Record<string, React.ReactNode> = {
  "plus": <Plus size={14} />,
  "edit": <Edit size={14} />,
  "check": <Check size={14} />,
  "message-circle": <MessageCircle size={14} />,
  "user": <User size={14} />,
  "x": <X size={14} />
};

const RecentActivity = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium">Hoạt động gần đây</h2>
      <div className="space-y-2">
        {recentActivities.map((activity) => (
          <div key={activity.id} className="flex items-center gap-3 p-3 rounded-md bg-white border">
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center">
              {iconMap[activity.icon] || <Plus size={14} />}
            </div>
            <div className="flex-1">
              <p className="text-sm">
                <span className="font-medium">{activity.action}</span>
                {" "}
                <span className="text-gray-600">{activity.target}</span>
              </p>
              <p className="text-xs text-gray-500">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
