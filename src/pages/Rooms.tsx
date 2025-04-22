
import { useState } from "react";
import { Search, Plus, Building, Filter } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { rooms, landlords } from "@/lib/mockData";

const statusColors: Record<string, string> = {
  available: "bg-green-100 text-green-800",
  rented: "bg-blue-100 text-blue-800",
  maintenance: "bg-amber-100 text-amber-800",
};

const statusLabels: Record<string, string> = {
  available: "Còn trống",
  rented: "Đã cho thuê",
  maintenance: "Đang bảo trì",
};

const Rooms = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [landlordFilter, setLandlordFilter] = useState("all");

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { 
      style: 'currency', 
      currency: 'VND',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const filteredRooms = rooms.filter((room) => {
    const matchesSearch = room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          room.address.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || room.status === statusFilter;
    
    const matchesLandlord = landlordFilter === "all" || room.landlordId.toString() === landlordFilter;
    
    return matchesSearch && matchesStatus && matchesLandlord;
  });

  const getLandlordName = (landlordId: number) => {
    const landlord = landlords.find(l => l.id === landlordId);
    return landlord ? landlord.name : "Không xác định";
  };

  return (
    <DashboardLayout>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Quản lý phòng trọ</h1>
          <p className="text-gray-500">Quản lý tất cả các phòng trọ của bạn</p>
        </div>
        
        <Button className="sm:self-end">
          <Plus size={16} className="mr-2" />
          Thêm phòng mới
        </Button>
      </div>

      <div className="bg-white p-4 rounded-lg border mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <Input 
              placeholder="Tìm kiếm phòng trọ..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Tất cả trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả trạng thái</SelectItem>
              <SelectItem value="available">Còn trống</SelectItem>
              <SelectItem value="rented">Đã cho thuê</SelectItem>
              <SelectItem value="maintenance">Đang bảo trì</SelectItem>
            </SelectContent>
          </Select>
          <Select value={landlordFilter} onValueChange={setLandlordFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Tất cả chủ trọ" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả chủ trọ</SelectItem>
              {landlords.map((landlord) => (
                <SelectItem key={landlord.id} value={landlord.id.toString()}>
                  {landlord.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRooms.map((room) => (
          <Card key={room.id} className="overflow-hidden">
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
                <Badge className={statusColors[room.status]}>
                  {statusLabels[room.status]}
                </Badge>
              </div>
              <p className="text-sm text-gray-500 mt-1 truncate">{room.address}</p>
              <div className="mt-2 text-xl font-bold text-blue-600">{formatCurrency(room.price)}<span className="text-sm font-normal text-gray-500">/tháng</span></div>
              
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
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default Rooms;
