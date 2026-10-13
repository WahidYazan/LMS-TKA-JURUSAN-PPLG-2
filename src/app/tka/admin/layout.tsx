import AdminGateClient from "@/components/admin/AdminGate";

export const instant = false;

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminGateClient>{children}</AdminGateClient>;
}
