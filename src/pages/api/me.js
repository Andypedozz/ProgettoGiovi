// src/pages/api/me.js
import { authRequired } from "../../middleware.js";

export const GET = authRequired(async ({ user }) => {
  return new Response(JSON.stringify({ user }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
});
