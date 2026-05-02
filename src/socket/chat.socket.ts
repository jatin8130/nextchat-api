import { Server } from "socket.io";
import { createChat } from "../controller/chat.controller";

const ChatSocket = (io: Server) => {
  io.on("connection", (socket) => {

    socket.on("message", (payload) => {
      const messageData = {
        ...payload,
        from: payload.from.id,
        createdAt: payload.createdAt || new Date().toISOString(), // ✅ ensure exists
      };

      createChat(messageData);

      // ✅ send full payload (NOT partial)
      io.to(payload.to).emit("message", {
        ...payload,
        createdAt: messageData.createdAt,
      });
    });

    socket.on("attachment", (payload) => {
      const messageData = {
        ...payload,
        from: payload.from.id,
        createdAt: payload.createdAt || new Date().toISOString(),
      };

      createChat(messageData);

      // ✅ FIX: wrong structure before
      io.to(payload.to).emit("attachment", {
        ...payload,
        createdAt: messageData.createdAt,
      });
    });

  });
};

export default ChatSocket;