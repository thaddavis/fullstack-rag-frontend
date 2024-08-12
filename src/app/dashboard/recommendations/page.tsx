import { redirect } from "next/navigation";
import { RecommendationContainer } from "./recommendation-container";
import { protectedPageGuard } from "@/components/shared/utils/validate-token";

export default async function Page() {
  try {
    await protectedPageGuard();
    return <RecommendationContainer />;
  } catch (error) {
    return redirect("/");
  }
}
