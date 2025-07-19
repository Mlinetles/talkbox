const webSockets = new Set<WebSocket>();

const channel = new BroadcastChannel('websocket');

channel.onmessage = e => webSockets.forEach(x => x.send(e.data))


export default {
    handle(req: Request) : Response {
        const { socket, response } = Deno.upgradeWebSocket(req)

        webSockets.add(socket)

        socket.onclose = e => webSockets.delete(e.target as WebSocket)

        socket.onmessage = e => {
            webSockets.forEach(x => x.send(e.data))
            channel.postMessage(e.data)
        }
        
        return response
    }
}