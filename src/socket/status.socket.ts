import { Server } from "socket.io";
import * as cookie from "cookie";
import jwt, { JwtPayload } from "jsonwebtoken";

interface User extends JwtPayload {
  id: string;
  name: string;
  email: string;
  image?: string;
}

// userId -> { user, sockets }
export const onlineUsers = new Map<
  string,
  { user: User; sockets: Set<string> }
>();

const StatusSocket = (io: Server) => {
  io.on("connection", (socket) => {
    try {
      const rawcookie = socket.handshake.headers.cookie || "";
      const cookies = cookie.parse(rawcookie);
      const accessToken = cookies.accessToken;

      if (!accessToken) throw new Error("Access token not found");

      const user = jwt.verify(
        accessToken,
        process.env.AUTH_SECRET_KEY!
      ) as User;

      const userId = user.id;

      // ✅ add socket to user
      if (!onlineUsers.has(userId)) {
        onlineUsers.set(userId, {
          user,
          sockets: new Set(),
        });
      }

      onlineUsers.get(userId)!.sockets.add(socket.id);

      socket.join(userId);

      // ✅ emit updated list
      emitOnlineUsers(io);

      socket.on("get-online", () => {
        emitOnlineUsers(socket); // send only to requester
      });

      socket.on("disconnect", () => {
        const entry = onlineUsers.get(userId);

        if (entry) {
          entry.sockets.delete(socket.id);

          // remove user if no active sockets
          if (entry.sockets.size === 0) {
            onlineUsers.delete(userId);
          }
        }

        emitOnlineUsers(io);
      });
    } catch (err) {
      socket.disconnect();
    }
  });
};

const emitOnlineUsers = (target: any) => {
  const users = Array.from(onlineUsers.values()).map(
    (entry) => entry.user
  );

  target.emit("online", users);
};

export default StatusSocket;