
import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { SearchCheck } from "lucide-react";
import RoomCard from "@/components/rooms/RoomCard";
import { rooms } from "@/lib/mockData";

type RoomStatus = "pending" | "failed" | "successful";

interface Room {
  id: number;
  name: string;
  address: string;
  price: number;
  status: string;
  area: number;
  facilities: string[];
  images: string[];
  landlordId: number;
  reviewStatus?: RoomStatus;
}

const RoomReview = () => {
  const [reviewedRooms, setReviewedRooms] = useState<Room[]>(
    rooms.map(room => ({ ...room, reviewStatus: "pending" as RoomStatus }))
  );

  const handleApprove = (roomId: number) => {
    setReviewedRooms(prev =>
      prev.map(room =>
        room.id === roomId ? { ...room, reviewStatus: "successful" as RoomStatus } : room
      )
    );
    toast.success("Phòng đã được phê duyệt thành công");
  };

  const handleReject = (roomId: number) => {
    setReviewedRooms(prev =>
      prev.map(room =>
        room.id === roomId ? { ...room, reviewStatus: "failed" as RoomStatus } : room
      )
    );
    toast.error("Phòng đã bị từ chối");
  };

  const handleAIReview = () => {
    // Simulate AI review process
    const updatedRooms = reviewedRooms.map(room => {
      if (room.reviewStatus === "pending") {
        // Simple mock logic: rooms with price > 10M are marked as failed
        const newStatus: RoomStatus = room.price > 10000000 ? "failed" : "successful";
        return { ...room, reviewStatus: newStatus };
      }
      return room;
    });

    setReviewedRooms(updatedRooms);
    toast.success("AI đã hoàn tất việc kiểm duyệt");
  };

  const filterRoomsByStatus = (status: RoomStatus | "all") => {
    return status === "all" 
      ? reviewedRooms 
      : reviewedRooms.filter(room => room.reviewStatus === status);
  };

  return (
    <DashboardLayout>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Kiểm duyệt phòng trọ</h1>
          <p className="text-gray-500">Quản lý và kiểm duyệt các phòng trọ mới</p>
        </div>
        <Button onClick={handleAIReview} className="bg-purple-600 hover:bg-purple-700">
          <SearchCheck className="mr-2 h-4 w-4" />
          AI Review
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">Tất cả ({reviewedRooms.length})</TabsTrigger>
          <TabsTrigger value="pending">
            Đang chờ ({filterRoomsByStatus("pending").length})
          </TabsTrigger>
          <TabsTrigger value="failed">
            Từ chối ({filterRoomsByStatus("failed").length})
          </TabsTrigger>
          <TabsTrigger value="successful">
            Đã duyệt ({filterRoomsByStatus("successful").length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filterRoomsByStatus("all").map((room) => (
              <RoomCard
                key={room.id}
                room={room}
                onApprove={() => handleApprove(room.id)}
                onReject={() => handleReject(room.id)}
                showActions={room.reviewStatus === "pending"}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="pending" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filterRoomsByStatus("pending").map((room) => (
              <RoomCard
                key={room.id}
                room={room}
                onApprove={() => handleApprove(room.id)}
                onReject={() => handleReject(room.id)}
                showActions={true}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="failed" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filterRoomsByStatus("failed").map((room) => (
              <RoomCard key={room.id} room={room} showActions={false} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="successful" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filterRoomsByStatus("successful").map((room) => (
              <RoomCard key={room.id} room={room} showActions={false} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default RoomReview;
