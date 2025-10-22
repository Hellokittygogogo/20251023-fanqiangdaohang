export async function onRequest(context) {
  const { request, params } = context;
  const urlObj = new URL(request.url);
  const slug = params.slug?.toLowerCase();

  // Mapping table: replace target with your real affiliate URLs
  const map = {
    coursera: { target: 'https://www.coursera.org/', subParam: 'u1' },
    udemy: { target: 'https://www.udemy.com/', subParam: 'utm_content' },
    notion: { target: 'https://www.notion.so/', subParam: 'u1' },
    canva: { target: 'https://www.canva.com/', subParam: 'u1' },
    grammarly: { target: 'https://www.grammarly.com/', subParam: 'u1' }
  };

  if (!slug || !map[slug]) {
    return new Response('Not found', { status: 404, headers: corsNoIndexHeaders() });
  }

  const { target, subParam } = map[slug];
  const out = new URL(target);

  // Build subId value from src/pos/referrer (safe length)
  const inSrc = urlObj.searchParams.get('src');
  const pos = urlObj.searchParams.get('pos');
  const ref = request.headers.get('referer');
  const refHost = safeHost(ref);
  const sub = [inSrc || refHost, pos].filter(Boolean).join(':').slice(0, 120);

  if (sub && subParam) {
    try { out.searchParams.set(subParam, sub); } catch (e) { /* ignore */ }
  }
  // Also pass through src/pos for your own analytics if needed
  if (inSrc) out.searchParams.set('src', inSrc);
  if (pos) out.searchParams.set('pos', pos);

  const headers = noIndexHeaders();
  return Response.redirect(out.toString(), 302, { headers });
}

function noIndexHeaders() {
  return new Headers({
    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
    'Pragma': 'no-cache',
    'Expires': '0',
    'X-Robots-Tag': 'noindex, nofollow, noarchive',
    'Referrer-Policy': 'strict-origin-when-cross-origin'
  });
}

function corsNoIndexHeaders() {
  const h = noIndexHeaders();
  h.set('Content-Type', 'text/plain; charset=utf-8');
  h.set('Access-Control-Allow-Origin', '*');
  return h;
}

function safeHost(referer) {
  try {
    if (!referer) return '';
    const u = new URL(referer);
    return u.host || '';
  } catch { return ''; }
}
