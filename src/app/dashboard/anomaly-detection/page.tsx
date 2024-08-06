import ProtectedRoute from "@/components/shared/protected-route";

export default function Page() {
  return (
    <ProtectedRoute>
      <div className="mx-auto max-w-2xl px-4">
        <div className="flex flex-col gap-2 rounded-lg border bg-background p-8">
          <h1 className="text-center text-5xl font-semibold leading-12">
            Anomaly Detection
          </h1>
        </div>
      </div>
    </ProtectedRoute>
  );
}
