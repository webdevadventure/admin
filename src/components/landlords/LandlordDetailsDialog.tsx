
import { Building } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import RoomCard from "@/components/rooms/RoomCard";
import { getStatusBadgeColor } from "./LandlordListItem";
import { LandlordStatus } from "@/types/landlord";

interface LandlordDetailsDialogProps {
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
  } | null;
  onOpenChange: (open: boolean) => void;
  formatDate: (date: string) => string;
  properties: Array<{
    id: number;
    name: string;
    address: string;
    price: number;
    status: string;
    area: number;
    facilities: string[];
    images: string[];
    landlordId: number;
  }>;
}

const LandlordDetailsDialog = ({ 
  landlord, 
  onOpenChange, 
  formatDate,
  properties
}: LandlordDetailsDialogProps) => {
  if (!landlord) return null;

  return (
    <Dialog open={!!landlord} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Thông tin chi tiết chủ trọ</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={landlord.avatar} />
              <AvatarFallback>{landlord.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-xl font-semibold">{landlord.name}</h3>
              <span className={`text-sm px-2 py-1 rounded-full inline-block mt-1 ${getStatusBadgeColor(landlord.status)}`}>
                {landlord.status === "active" ? "Hoạt động" : 
                 landlord.status === "inactive" ? "Đã cấm" : "Đang chờ"}
              </span>
            </div>
          </div>
          
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Email</p>
                <p>{landlord.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Số điện thoại</p>
                <p>{landlord.phone}</p>
              </div>
            </div>
            
            <div>
              <p className="text-sm font-medium text-gray-500">Địa chỉ</p>
              <p>{landlord.address}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Ngày tham gia</p>
                <p>{formatDate(landlord.joinedDate)}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Tổng số phòng</p>
                <p>{landlord.totalRooms} phòng</p>
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <h4 className="text-lg font-semibold mb-4">Danh sách phòng trọ</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {properties.map((room) => (
                <RoomCard key={room.id} room={room} />
              ))}
              {properties.length === 0 && (
                <p className="text-gray-500 col-span-2 text-center py-4">
                  Chủ trọ này chưa có phòng nào
                </p>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LandlordDetailsDialog;
