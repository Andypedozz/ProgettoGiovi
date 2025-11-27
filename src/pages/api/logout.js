// src/pages/api/logout.js
export async function POST() {
  return new Response(JSON.stringify({ message: "Logout eseguito" }), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
}
