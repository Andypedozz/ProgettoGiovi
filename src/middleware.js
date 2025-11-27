// src/middleware.js
import { verifyToken } from "./lib/auth.js";

export function onRequest({ request, redirect }, next) {
  const url = new URL(request.url);

  // Protegge /admin e tutte le sotto-route
  if (url.pathname.startsWith('/admin')) {
    const token = request.headers.get('cookie')
      ?.split(';')
      ?.find(c => c.trim().startsWith('token='))
      ?.split('=')[1];

    console.log(token);

    if (!token) {
      console.log("Non autenticato");
      return redirect('/login');
    }

    const user = verifyToken(token);
    if (!user || user.role !== 'admin') {
      console.log("Non sei admin");
      return redirect('/login');
    }
  }

  // 🔥 Importante: continua il flusso
  return next();
}
