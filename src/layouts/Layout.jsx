import Sidebar from "../components/Sidebar/SideBar";
import { Button } from "../components/ui/button";

export default function MainLayout() {
  return (
    <>
      <Sidebar />
      <div className="flex flex-col items-center justify-center min-h-svh">
        <Button>Click me</Button>
      </div>
    </>
  );
}
