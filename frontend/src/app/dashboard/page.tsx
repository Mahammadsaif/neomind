import AppLayout from "@/components/layout/AppLayout";

export default function DashboardPage() {
  return (
    <AppLayout>
      <h1 className="text-2xl font-semibold mb-2">Dashboard</h1>
      <p className="text-muted">This is your dashboard overview.</p>
    </AppLayout>
  );
}