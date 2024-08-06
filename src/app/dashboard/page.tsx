import { redirect } from "next/navigation";

export default function Page() {
  redirect("/dashboard/no-rag");
  return null;
}
