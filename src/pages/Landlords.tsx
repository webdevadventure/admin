import { useState } from "react";
import { Search } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Input } from "@/components/ui/input";
import { landlords, rooms } from "@/lib/mockData";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";
import LandlordListItem from "@/components/landlords/LandlordListItem";
import LandlordDetailsDialog from "@/components/landlords/LandlordDetailsDialog";
import type { Landlord, LandlordStatus } from "@/types/landlord";

const Landlords = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLandlord, setSelectedLandlord] = useState<Landlord | null>(null);
  const [reviewedLandlords, setReviewedLandlords] = useState<Landlord[]>(
    landlords.map(landlord => ({ ...landlord, status: "pending" as LandlordStatus }))
  );

  const handleApprove = (landlordId: number) => {
    setReviewedLandlords(prev =>
      prev.map(landlord =>
        landlord.id === landlordId ? { ...landlord, status: "active" as LandlordStatus } : landlord
      )
    );
    toast.success("Chủ trọ đã được phê duyệt");
  };

  const handleBan = (landlordId: number) => {
    setReviewedLandlords(prev =>
      prev.map(landlord =>
        landlord.id === landlordId ? { ...landlord, status: "inactive" as LandlordStatus } : landlord
      )
    );
    toast.error("Chủ trọ đã bị cấm");
  };

  const handleUnban = (landlordId: number) => {
    setReviewedLandlords(prev =>
      prev.map(landlord =>
        landlord.id === landlordId ? { ...landlord, status: "active" as LandlordStatus } : landlord
      )
    );
    toast.success("Đã gỡ cấm chủ trọ");
  };

  const filteredLandlords = reviewedLandlords.filter((landlord) => {
    const searchMatch = landlord.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           landlord.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
           landlord.phone.includes(searchTerm);
    return searchMatch;
  });

  const filterLandlordsByStatus = (status: LandlordStatus | "all") => {
    return status === "all" 
      ? filteredLandlords 
      : filteredLandlords.filter(landlord => landlord.status === status);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
  };

  const getLandlordProperties = (landlordId: number) => {
    return rooms.filter(room => room.landlordId === landlordId);
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Chủ cho thuê</h1>
        <p className="text-gray-500">Quản lý và phê duyệt các chủ cho thuê</p>
      </div>

      <div className="bg-white p-4 rounded-lg border mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <Input 
            placeholder="Tìm kiếm theo tên, email, số điện thoại..." 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">
            Tất cả ({filterLandlordsByStatus("all").length})
          </TabsTrigger>
          <TabsTrigger value="pending">
            Đang chờ ({filterLandlordsByStatus("pending").length})
          </TabsTrigger>
          <TabsTrigger value="active">
            Hoạt động ({filterLandlordsByStatus("active").length})
          </TabsTrigger>
          <TabsTrigger value="inactive">
            Đã cấm ({filterLandlordsByStatus("inactive").length})
          </TabsTrigger>
        </TabsList>

        {["all", "pending", "active", "inactive"].map((tab) => (
          <TabsContent key={tab} value={tab} className="mt-6">
            <div className="bg-white rounded-lg border overflow-hidden">
              <div className="grid grid-cols-1 divide-y">
                {filterLandlordsByStatus(tab as LandlordStatus | "all").map((landlord) => (
                  <LandlordListItem
                    key={landlord.id}
                    landlord={landlord}
                    onViewDetails={() => setSelectedLandlord(landlord)}
                    onBan={() => handleBan(landlord.id)}
                    onApprove={() => handleApprove(landlord.id)}
                    onUnban={() => handleUnban(landlord.id)}
                    formatDate={formatDate}
                  />
                ))}
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <LandlordDetailsDialog
        landlord={selectedLandlord}
        onOpenChange={() => setSelectedLandlord(null)}
        formatDate={formatDate}
        properties={selectedLandlord ? getLandlordProperties(selectedLandlord.id) : []}
      />
    </DashboardLayout>
  );
};

export default Landlords;
