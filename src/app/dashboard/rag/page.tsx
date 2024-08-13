import { redirect } from "next/navigation";
import { RagContainer } from "./rag-container";
import { protectedPageGuard } from "@/components/shared/utils/validate-token";

export default async function Page() {
  try {
    await protectedPageGuard();
    return <RagContainer />;
  } catch (error) {
    return redirect("/");
  }
}
