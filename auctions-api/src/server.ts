import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import { registerControllers, registerEvents } from "./app";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
export const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(
  cors({
    origin: "*",
  })
);

registerControllers(app);
registerEvents(io);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`App running on port ${PORT}`));
