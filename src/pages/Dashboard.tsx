
import { Building, Home, Users, Banknote } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import StatCard from "@/components/dashboard/StatCard";
import RecentActivity from "@/components/dashboard/RecentActivity";
import { statistics } from "@/lib/mockData";

const Dashboard = () => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { 
      style: 'currency', 
      currency: 'VND',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-500">Xin chào, chào mừng bạn quay trở lại!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Tổng số phòng"
          value={statistics.totalRooms}
          icon={<Building size={18} className="text-blue-500" />}
          trend="up"
          trendValue="+2"
        />
        <StatCard
          title="Phòng đang cho thuê"
          value={statistics.rentedRooms}
          description={`${statistics.occupancyRate}% tỷ lệ lấp đầy`}
          icon={<Home size={18} className="text-green-500" />}
          trend="up"
          trendValue="+1"
        />
        <StatCard
          title="Chủ cho thuê"
          value={statistics.totalLandlords}
          icon={<Users size={18} className="text-purple-500" />}
          trend="neutral"
          trendValue="0"
        />
        <StatCard
          title="Doanh thu"
          value={formatCurrency(statistics.totalRevenue)}
          icon={<Banknote size={18} className="text-yellow-500" />}
          trend="up"
          trendValue="+5%"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-lg border">
            <h2 className="text-lg font-medium mb-4">Phân bố trạng thái phòng</h2>
            <div className="h-48 flex items-center justify-center">
              <div className="w-full flex gap-4">
                <div className="flex-1 h-40 flex flex-col justify-end">
                  <div className="bg-blue-500 rounded-t-md" style={{ height: `${(statistics.availableRooms / statistics.totalRooms) * 100}%` }}></div>
                  <p className="text-xs text-center mt-1">Còn trống</p>
                  <p className="text-xs text-center font-bold">{statistics.availableRooms}</p>
                </div>
                <div className="flex-1 h-40 flex flex-col justify-end">
                  <div className="bg-green-500 rounded-t-md" style={{ height: `${(statistics.rentedRooms / statistics.totalRooms) * 100}%` }}></div>
                  <p className="text-xs text-center mt-1">Đã thuê</p>
                  <p className="text-xs text-center font-bold">{statistics.rentedRooms}</p>
                </div>
                <div className="flex-1 h-40 flex flex-col justify-end">
                  <div className="bg-amber-500 rounded-t-md" style={{ height: `${(statistics.maintenanceRooms / statistics.totalRooms) * 100}%` }}></div>
                  <p className="text-xs text-center mt-1">Bảo trì</p>
                  <p className="text-xs text-center font-bold">{statistics.maintenanceRooms}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border">
            <h2 className="text-lg font-medium mb-4">Phòng sắp hết hạn</h2>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left">
                  <th className="pb-3 font-medium text-gray-500">Phòng</th>
                  <th className="pb-3 font-medium text-gray-500">Người thuê</th>
                  <th className="pb-3 font-medium text-gray-500">Ngày hết hạn</th>
                  <th className="pb-3 font-medium text-gray-500">Còn lại</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="py-3">Phòng 101</td>
                  <td className="py-3">Nguyễn Văn X</td>
                  <td className="py-3">25/04/2025</td>
                  <td className="py-3"><span className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-700">4 ngày</span></td>
                </tr>
                <tr className="border-t">
                  <td className="py-3">Phòng 305</td>
                  <td className="py-3">Trần Thị Y</td>
                  <td className="py-3">30/04/2025</td>
                  <td className="py-3"><span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-700">9 ngày</span></td>
                </tr>
                <tr className="border-t">
                  <td className="py-3">Phòng 202</td>
                  <td className="py-3">Lê Văn Z</td>
                  <td className="py-3">10/05/2025</td>
                  <td className="py-3"><span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-700">19 ngày</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <RecentActivity />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
