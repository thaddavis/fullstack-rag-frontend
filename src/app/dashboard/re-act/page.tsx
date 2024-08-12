import { redirect } from "next/navigation";
import { ReActContainer } from "./re-act-container";
import { protectedPageGuard } from "@/components/shared/utils/validate-token";

export default async function Page() {
  try {
    await protectedPageGuard();
    return <ReActContainer />;
  } catch (error) {
    return redirect("/");
  }
}
