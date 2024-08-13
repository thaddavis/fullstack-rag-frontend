import { redirect } from "next/navigation";
import { AnomalyDetectionContainer } from "./anomaly-detection-container";
import { protectedPageGuard } from "@/components/shared/utils/validate-token";

export default async function Page() {
  try {
    await protectedPageGuard();
    return <AnomalyDetectionContainer />;
  } catch (error) {
    return redirect("/");
  }
}
