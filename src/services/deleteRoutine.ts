export async function deleteRoutine(id: number) {
  console.log('localStorage.getItem("token")', localStorage.getItem("token"));

  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/routines/?routine_id=${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  if (!resp.ok) throw "Network response was not OK";

  return resp;
}
