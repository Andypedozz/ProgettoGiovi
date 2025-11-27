// src/pages/api/login.js
import { validateUser } from "../../lib/userService.js";
import { generateToken } from "../../lib/auth.js";

export async function GET({ request }) {
  return new Response(JSON.stringify({ error: 'Metodo non permesso' }), {
    status: 405,
    headers: { 'Content-Type': 'application/json' }
  });
}

export async function POST({ request }) {
  const { email, password } = await request.json();

  const user = validateUser(email, password);

  if (!user) {
    return new Response(JSON.stringify({ error: 'Credenziali non valide' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const token = generateToken({ id: user.id, role: user.role });

  return new Response(JSON.stringify({ token }), {
  status: 200,
  headers: {
    "Content-Type": "application/json",
    "Set-Cookie": `token=${token}; HttpOnly; Path=/; Max-Age=604800`
  }
});

}
