
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Home, 
  Users, 
  Building,
  MessageCircle, 
  Menu, 
  X, 
  Settings,
  ClipboardCheck
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

const navItems = [
  {
    name: "Dashboard",
    path: "/",
    icon: Home,
  },
  {
    name: "Phòng trọ",
    path: "/rooms",
    icon: Building,
  },
  {
    name: "Kiểm duyệt",
    path: "/room-review",
    icon: ClipboardCheck,
  },
  {
    name: "Chủ cho thuê",
    path: "/landlords",
    icon: Users,
  },
  {
    name: "Tin nhắn",
    path: "/messages",
    icon: MessageCircle,
  },
  {
    name: "Cài đặt",
    path: "/settings",
    icon: Settings,
  },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="outline"
        size="icon"
        className={cn(
          "fixed top-4 left-4 z-50 lg:hidden",
          isOpen && "left-64"
        )}
        onClick={toggleSidebar}
      >
        {isOpen ? <X size={18} /> : <Menu size={18} />}
      </Button>

      {/* Sidebar */}
      <aside
        className={cn(
          "left-0 top-0 z-40 h-screen w-64 bg-white border-r border-gray-200 transition-transform lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="h-16 flex items-center justify-center border-b">
            <h1 className="text-xl font-bold text-blue-600">Admin | Trọ Tốt</h1>
          </div>

          {/* Nav items */}
          <nav className="flex-1 p-4 space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={cn(
                    "flex items-center px-4 py-3 rounded-md text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors",
                    isActive && "bg-blue-50 text-blue-600 font-medium"
                  )}
                  onClick={() => isMobile && setIsOpen(false)}
                >
                  <item.icon className="mr-3" size={18} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* User */}
          <div className="p-4 border-t">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
                A
              </div>
              <div>
                <p className="text-sm font-medium">Admin</p>
                <p className="text-xs text-gray-500">admin@nhatroconnect.vn</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && isMobile && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
