import { Socket } from "socket.io";
import { Auction, Bid } from "../database";
import { validateAuction } from "../services/auctionService";

const intervals = {};

export const createAuction = (socket: Socket) => {
  socket.on("createAuction", async (data: any, callback) => {
    console.log("createAuction:", data);

    const auction: any = await Auction.create({
      title: data.title,
      duration: data.duration - Date.now(),
      description: data.description,
      imageUrl: data.imageUrl,
      startBid: data.startBid,
      status: "active",
    });

    socket.broadcast.emit("newAuction", auction);

    callback(auction);

    //Evento para o App leião

    console.log("\n\n==== Leilão criado com sucesso. ====");
    console.log({ createAuction: auction.get({ plain: true }) });

    intervals[auction.id] = setInterval(async () => {
      const updatedAuction = await validateAuction({ auction });

      if (updatedAuction) {
        clearInterval(intervals[auction.id]);
        socket.emit("auctionUpdated", updatedAuction);
        socket.broadcast.emit("auctionUpdated", updatedAuction);
      }
    }, 30000);

    setTimeout(async () => {
      clearInterval(intervals[auction.id]);

      socket.broadcast.emit(
        "auctionUpdated",
        await validateAuction({
          auction,
          checkLast30Seconds: false,
        })
      );
    }, auction.duration);
  });
};
