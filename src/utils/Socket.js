class Socket {
    constructor() {
        // ganti pake env
        this.socket = new WebSocket("ws://13.251.114.0:8000/api/v1/conversation/ws");

        this.socket.onopen = function (e) {
            console.log("[open] Connection established");
        };

        this.socket.onclose = function (event) {
            if (event.wasClean) {
                console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
            } else {
                console.log('[close] Connection died');
            }
        };

        this.socket.onerror = function (error) {
            console.log(`[error] ${error.message}`);
        };
    }
}

export default new Socket();
