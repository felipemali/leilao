import { Socket } from "socket.io";
import { Auction, Bid } from "../database";

export const newBid = (socket: Socket) => {
  socket.on("newBid", async (data: any) => {
    await Bid.create({
      auctionId: data.auctionId,
      amount: data.amount,
      username: data.username,
    });

    const auction = await Auction.findOne({
      include: "bids",
      where: {
        id: data.auctionId,
      },
    });

    socket.emit("auctionUpdated", auction);
    socket.broadcast.emit("auctionUpdated", auction);
  });
};
