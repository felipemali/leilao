import { Server } from "socket.io";
import { auctionsController } from "./controllers";
import events from "./events";

export const registerControllers = (app) => {
  app.get("/auctions", auctionsController.getAllAuctions);
  app.get("/auction/:id", auctionsController.getOne);
  app.get("/auctions/active", auctionsController.getAuctionsActive);
};

export const registerEvents = (io: Server) => {
  io.on("connection", (socket) => {
    console.log("Conectado!!!");

    socket.emit("usuarioConectou", "Seja bem vindo ao leilão...");

    events.createAuction(socket);
    events.newBid(socket);

    // events.changeStatus(socket)
    // getActiveAuctions()
  });
};
