import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function validateToken(token: string) {
  console.log("--- validateToken ---");

  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/validate-token`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!resp.ok) {
    throw new Error("Failed to validate token");
  }
}

export async function protectedPageGuard() {
  try {
    console.log();
    console.log("protectedPageGuard");
    console.log();

    const cookieStore = cookies();
    const jwtCookie = cookieStore.get("jwt");

    console.log(jwtCookie);

    if (!jwtCookie?.value) return redirect("/");

    await validateToken(jwtCookie?.value);
  } catch (error) {
    return redirect("/");
  }
}
