// Cloudflare Pages Function - proxy to digital twin Worker
// URL: /me/chat?msg=xxx

export async function onRequest(context) {
  const url = new URL(context.request.url);
  const msg = url.searchParams.get('msg') || '';

  if (!msg) {
    return new Response(JSON.stringify({ error: 'msg required' }), {
      status: 400, headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const resp = await fetch('https://me.ray2.asia/chat?msg=' + encodeURIComponent(msg));
    const data = await resp.json();
    return new Response(JSON.stringify(data), {
      status: resp.status, headers: { 'Content-Type': 'application/json' }
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 502, headers: { 'Content-Type': 'application/json' }
    });
  }
}
