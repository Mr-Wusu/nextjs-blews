import { Button } from "@/app/_components/Button";
import Link from "next/link";

function AdminDashboard() {
  return <div className="flex gap-4">
    <Button className="w-max px-2">
      <Link href="/dashboard/upload-cloth">Upload Cloth</Link>
    </Button>
    <Button className="w-max px-2">
      <Link href="/dashboard/cloth-orders">Cloth Orders</Link>
    </Button>
  </div>;
}

export default AdminDashboard;
