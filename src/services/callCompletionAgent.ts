export async function callCompletionAgent(prompt: string) {
  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_AGENT_API_URL}/completion-agent/completion`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: prompt,
      }),
    }
  );

  if (!resp.ok) throw "Network response was not OK";

  return resp;
}
