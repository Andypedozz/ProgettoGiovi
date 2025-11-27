// src/pages/api/register.js
import { createUser } from "../../lib/userService.js";

export async function POST({ request }) {
  const { email, password, role } = await request.json();

  const user = createUser(email, password, role);

  if (!user) {
    return new Response(JSON.stringify({ error: "Utente già esistente" }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  return new Response(JSON.stringify({ user }), {
    status: 201,
    headers: { 'Content-Type': 'application/json' }
  });
}
