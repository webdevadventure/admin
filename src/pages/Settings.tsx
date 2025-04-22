
import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Settings = () => {
  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    browser: true,
    newMessage: true,
    newRoom: true,
    roomExpiry: true,
  });

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Cài đặt</h1>
        <p className="text-gray-500">Quản lý tài khoản và cài đặt hệ thống</p>
      </div>

      <div className="bg-white rounded-lg border overflow-hidden">
        <Tabs defaultValue="profile">
          <TabsList className="p-0 border-b bg-transparent">
            <TabsTrigger value="profile" className="px-4 py-3 rounded-t-lg data-[state=active]:bg-white data-[state=active]:border-b-0">
              Thông tin cá nhân
            </TabsTrigger>
            <TabsTrigger value="notifications" className="px-4 py-3 rounded-t-lg data-[state=active]:bg-white data-[state=active]:border-b-0">
              Thông báo
            </TabsTrigger>
            <TabsTrigger value="security" className="px-4 py-3 rounded-t-lg data-[state=active]:bg-white data-[state=active]:border-b-0">
              Bảo mật
            </TabsTrigger>
            <TabsTrigger value="system" className="px-4 py-3 rounded-t-lg data-[state=active]:bg-white data-[state=active]:border-b-0">
              Hệ thống
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="p-6">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-32 w-32">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>A</AvatarFallback>
                </Avatar>
                <Button variant="outline">Thay đổi ảnh</Button>
              </div>

              <div className="flex-1 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Họ và tên</Label>
                    <Input id="name" defaultValue="Admin" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="admin@nhatroconnect.vn" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Số điện thoại</Label>
                    <Input id="phone" defaultValue="0901234567" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Vai trò</Label>
                    <Input id="role" defaultValue="Quản trị viên" disabled />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Giới thiệu</Label>
                  <Textarea id="bio" rows={4} placeholder="Thêm giới thiệu về bạn" />
                </div>

                <div className="flex justify-end">
                  <Button>Lưu thay đổi</Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="p-6 space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Phương thức thông báo</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-notifications">Email</Label>
                  <Switch 
                    id="email-notifications" 
                    checked={notificationSettings.email}
                    onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, email: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="browser-notifications">Thông báo trên trình duyệt</Label>
                  <Switch 
                    id="browser-notifications" 
                    checked={notificationSettings.browser}
                    onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, browser: checked }))}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Cài đặt thông báo</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="new-message-notification">Tin nhắn mới</Label>
                  <Switch 
                    id="new-message-notification" 
                    checked={notificationSettings.newMessage}
                    onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, newMessage: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="new-room-notification">Phòng mới</Label>
                  <Switch 
                    id="new-room-notification" 
                    checked={notificationSettings.newRoom}
                    onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, newRoom: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="room-expiry-notification">Thông báo sắp hết hạn</Label>
                  <Switch 
                    id="room-expiry-notification" 
                    checked={notificationSettings.roomExpiry}
                    onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, roomExpiry: checked }))}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button>Lưu thay đổi</Button>
            </div>
          </TabsContent>

          <TabsContent value="security" className="p-6 space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Đổi mật khẩu</h3>
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Mật khẩu hiện tại</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">Mật khẩu mới</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Xác nhận mật khẩu</Label>
                  <Input id="confirm-password" type="password" />
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button>Cập nhật mật khẩu</Button>
            </div>
          </TabsContent>

          <TabsContent value="system" className="p-6 space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Ngôn ngữ</h3>
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="language">Chọn ngôn ngữ</Label>
                  <select 
                    id="language"
                    className="w-full border border-gray-300 rounded-md p-2"
                  >
                    <option value="vi">Tiếng Việt</option>
                    <option value="en">English</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Sao lưu dữ liệu</h3>
              <div className="space-y-3">
                <div className="flex">
                  <Button variant="outline">Xuất dữ liệu</Button>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button>Lưu thay đổi</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
