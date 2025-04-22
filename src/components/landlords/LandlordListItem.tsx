/* eslint-disable react-refresh/only-export-components */
import { Check, Clock, Eye, Ban, X, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LandlordStatus } from "@/types/landlord";

interface LandlordListItemProps {
  landlord: {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    avatar: string;
    joinedDate: string;
    totalRooms: number;
    status: LandlordStatus;
  };
  onViewDetails: () => void;
  onBan: () => void;
  onApprove: () => void;
  onUnban: () => void;
  formatDate: (date: string) => string;
}

export const getStatusIcon = (status: LandlordStatus) => {
  switch (status) {
    case "active":
      return <Check className="text-green-500" size={16} />;
    case "inactive":
      return <X className="text-red-500" size={16} />;
    default:
      return <Clock className="text-yellow-500" size={16} />;
  }
};

export const getStatusBadgeColor = (status: LandlordStatus) => {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-800";
    case "inactive":
      return "bg-red-100 text-red-800";
    default:
      return "bg-yellow-100 text-yellow-800";
  }
};

const LandlordListItem = ({ 
  landlord, 
  onViewDetails, 
  onBan, 
  onApprove,
  onUnban,
  formatDate 
}: LandlordListItemProps) => {
  return (
    <div className="p-4">
      <div className="flex items-start gap-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src={landlord.avatar} />
          <AvatarFallback>{landlord.name.charAt(0)}</AvatarFallback>
        </Avatar>
        
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-medium text-lg">{landlord.name}</h3>
            {getStatusIcon(landlord.status)}
            <span className={`text-xs px-2 py-1 rounded-full ${getStatusBadgeColor(landlord.status)}`}>
              {landlord.status === "active" ? "Hoạt động" : 
               landlord.status === "inactive" ? "Đã cấm" : "Đang chờ"}
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 text-sm mt-2">
            <div className="flex items-center gap-1 text-gray-600">
              <User size={14} />
              <span>{landlord.email}</span>
            </div>
            <div className="flex items-center gap-1 text-gray-600">
              <Clock size={14} />
              <span>Tham gia: {formatDate(landlord.joinedDate)}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={onViewDetails}
          >
            <Eye size={16} className="mr-1" />
            Chi tiết
          </Button>
          {landlord.status === "inactive" ? (
            <Button 
              variant="outline" 
              size="sm"
              onClick={onUnban}
              className="text-green-600 hover:text-green-700"
            >
              <Check size={16} className="mr-1" />
              Gỡ cấm
            </Button>
          ) : (
            <Button 
              variant="outline" 
              size="sm"
              onClick={onBan}
              className="text-red-600 hover:text-red-700"
            >
              <Ban size={16} className="mr-1" />
              Cấm
            </Button>
          )}
          {landlord.status === "pending" && (
            <Button 
              size="sm"
              onClick={onApprove}
              className="bg-green-600 hover:bg-green-700"
            >
              <Check size={16} className="mr-1" />
              Phê duyệt
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LandlordListItem;
