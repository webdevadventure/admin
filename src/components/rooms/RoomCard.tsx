
import { Building } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { landlords } from "@/lib/mockData";

interface RoomCardProps {
  room: {
    id: number;
    name: string;
    address: string;
    price: number;
    status: string;
    area: number;
    facilities: string[];
    images: string[];
    landlordId: number;
    reviewStatus?: "pending" | "failed" | "successful";
  };
  onApprove?: () => void;
  onReject?: () => void;
  showActions?: boolean;
}

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  failed: "bg-red-100 text-red-800",
  successful: "bg-green-100 text-green-800",
};

const statusLabels: Record<string, string> = {
  pending: "Đang chờ",
  failed: "Từ chối",
  successful: "Đã duyệt",
};

const RoomCard = ({ room, onApprove, onReject, showActions = false }: RoomCardProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { 
      style: 'currency', 
      currency: 'VND',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getLandlordName = (landlordId: number) => {
    const landlord = landlords.find(l => l.id === landlordId);
    return landlord ? landlord.name : "Không xác định";
  };

  return (
    <Card className="overflow-hidden">
      <div className="h-48 overflow-hidden">
        <img 
          src={room.images[0]} 
          alt={room.name} 
          className="w-full h-full object-cover"
        />
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-lg">{room.name}</h3>
          {room.reviewStatus && (
            <Badge className={statusColors[room.reviewStatus]}>
              {statusLabels[room.reviewStatus]}
            </Badge>
          )}
        </div>
        <p className="text-sm text-gray-500 mt-1 truncate">{room.address}</p>
        <div className="mt-2 text-xl font-bold text-blue-600">
          {formatCurrency(room.price)}
          <span className="text-sm font-normal text-gray-500">/tháng</span>
        </div>
        
        <div className="flex mt-3 gap-3 text-sm">
          <div>{room.area} m²</div>
          <div className="flex items-center">
            <Building size={14} className="mr-1" />
            <span>{getLandlordName(room.landlordId)}</span>
          </div>
        </div>
        
        <div className="mt-3 flex gap-2 flex-wrap">
          {room.facilities.slice(0, 3).map((facility, index) => (
            <Badge key={index} variant="outline" className="bg-gray-50">
              {facility}
            </Badge>
          ))}
          {room.facilities.length > 3 && (
            <Badge variant="outline" className="bg-gray-50">
              +{room.facilities.length - 3}
            </Badge>
          )}
        </div>

        {showActions && (
          <div className="flex gap-2 mt-4">
            <Button 
              className="flex-1 bg-green-600 hover:bg-green-700" 
              onClick={onApprove}
            >
              Phê duyệt
            </Button>
            <Button 
              className="flex-1 bg-red-600 hover:bg-red-700" 
              onClick={onReject}
            >
              Từ chối
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RoomCard;
