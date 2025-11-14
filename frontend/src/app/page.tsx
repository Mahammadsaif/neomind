import AppLayout from "@/components/layout/AppLayout";

export default function Home() {
  return (
    <AppLayout>
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold text-white">Welcome to NeoMind</h1>
        <p className="text-muted">
          This is your dashboard. Your chat interface and memory panel will appear here.
        </p>
      </div>
    </AppLayout>
  );
}