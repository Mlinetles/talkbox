import WebSocketHandler from "./websocket/handle.ts";

Deno.serve(x => {
    if (new URL(x.url).pathname === '/ws' && x.headers.get("upgrade") === "websocket") return WebSocketHandler.handle(x)
    return new Response(null, { status: 404 });
})