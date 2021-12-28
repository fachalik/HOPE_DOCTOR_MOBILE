import config from '../../config';

class Socket {
  constructor() {
    this.socket = new WebSocket(`${config.API_URL_NEW}conversation/ws`);

    this.socket.onopen = function (e) {
      console.log('[open] Connection established');
    };

    this.socket.onclose = function (event) {
      if (event.wasClean) {
        console.log(
          `[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`,
        );
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
