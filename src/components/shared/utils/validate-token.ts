import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function validateToken(token: string) {
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
    const cookieStore = cookies();
    const jwtCookie = cookieStore.get("jwt");
    if (!jwtCookie?.value) return redirect("/");
    await validateToken(jwtCookie?.value);
  } catch (error) {
    return redirect("/");
  }
}
