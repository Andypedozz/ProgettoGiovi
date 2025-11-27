export async function POST() {
  return new Response(JSON.stringify({ message: "Logout eseguito" }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Set-Cookie": `token=; Path=/; HttpOnly; Max-Age=0`
    }
  });
}
