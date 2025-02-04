import { Auction, Bid } from "../database";

const updateAuction = async (auction: any, status: string) => {
  await auction.update({ status });

  return await Auction.findOne({
    include: "bids",
    where: {
      id: auction.id,
    },
  });
};

export const validateAuction = async ({
  auction,
  checkLast30Seconds = true,
}: any) => {
  const bids: any = await Bid.findAll({
    raw: true,
    where: {
      auctionId: auction.id,
    },
  });

  if (bids.length === 0) {
    console.log("\n Cancelando...");
    return await updateAuction(auction, "cancelled");
  }

  const hasBidInLast30Seconds =
    checkLast30Seconds &&
    bids.some(
      (bid) => new Date(bid.createdAt) >= new Date(Date.now() - 30 * 1000)
    );

  if (hasBidInLast30Seconds) {
    console.log("\n +30 segundos...");
    return;
  }

  console.log("Finalizando leilão...");
  return await updateAuction(auction, "completed");
};
