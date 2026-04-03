import type { Server as SocketIOServer } from "socket.io";

type GlobalWithSocket = typeof globalThis & {
  io?: SocketIOServer;
};

function getSocketServer() {
  return (globalThis as GlobalWithSocket).io;
}

export function emitNewConsult(consult: unknown) {
  const io = getSocketServer();
  if (!io) {
    return;
  }

  io.emit("new-consult", consult);
}
