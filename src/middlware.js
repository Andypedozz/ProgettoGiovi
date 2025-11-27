// src/middleware.js
import { verifyToken } from "./lib/auth.js";

export function authRequired(handler) {
  return async function (context) {
    const authHeader = context.request.headers.get('authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Token mancante' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const token = authHeader.replace('Bearer ', '');
    const decoded = verifyToken(token);

    if (!decoded) {
      return new Response(JSON.stringify({ error: 'Token non valido' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    context.user = decoded;
    return handler(context);
  };
}

export function adminOnly(handler) {
  return async function (context) {
    const user = context.user;

    if (!user || user.role !== 'admin') {
      return new Response(JSON.stringify({ error: 'Accesso negato' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return handler(context);
  };
}

export function onRequest({ request, redirect }) {
  const url = new URL(request.url);

  // Protegge /admin e tutte le sotto-route
  if (url.pathname.startsWith('/admin')) {
    const token = request.headers.get('cookie')
      ?.split(';')
      ?.find(c => c.trim().startsWith('token='))
      ?.split('=')[1];

    if (!token) {
      return redirect('/login');
    }

    const user = verifyToken(token);
    if (!user || user.role !== 'admin') {
      return redirect('/login');
    }
  }
}
