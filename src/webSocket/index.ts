interface SubscribeParams {
  callback: (message: unknown) => void;
}

let socketService: WebSocket;
let connected = false;
const callbacks: Array<SubscribeParams["callback"]> = [];
const socketUrl = "ws://uamusic.io:9501";

export function subscribeToSocket({
  callback,
}: SubscribeParams): Promise<void> {
  callbacks.push(callback);

  if (socketService && connected) {
    console.log("Already connected to WebSocket");

    return Promise.reject();
  }

  if (socketService && !connected) {
    console.log("You are already in connecting state");

    return Promise.reject();
  }

  return new Promise((resolve, reject) => {
    socketService = new WebSocket(socketUrl);
    socketService.onmessage = function (event) {
      callbacks.forEach((callback) => {
        const data = event.data;
        console.log("-- Received socket msg:", data);
        if (typeof data === "string" && data.startsWith("{")) {
          // Handle JSON data
          const message = JSON.parse(event.data) as unknown;
          callback(message);
        }
      });
    };
    socketService.onopen = function () {
      console.debug("Connected to WebSocket!");
      connected = true;
      resolve();
    };
    socketService.onclose = function () {
      console.debug("Connection closed");
    };
    socketService.onerror = function () {
      console.debug("Error happens");
      reject();
    };
  });
}

export function sendMessage(message: string) {
  socketService.send(message);
}
