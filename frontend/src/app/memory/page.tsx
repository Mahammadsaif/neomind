import AppLayout from "@/components/layout/AppLayout";

export default function MemoryPage() {
  return (
    <AppLayout>
      <h1 className="text-2xl font-semibold mb-2">Memory</h1>
      <p className="text-muted">Your saved memories will appear here.</p>
    </AppLayout>
  );
}