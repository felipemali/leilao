import { RequestHandler } from "express";
import { Auction } from "../database";

export const getOne = async (req: any, res: any) => {
  const auction = await Auction.findOne({
    include: "bids",
    where: {
      id: req.params.id,
    },
  });

  if (auction) {
    return res.json(auction);
  }

  return res.status(404).json({ message: "Leilão não encontrado." });
};

export const getAllAuctions: RequestHandler = async (req, res) => {
  const data = await Auction.findAll({});
  res.json(data);
};

export const getAuctionsActive = async (req, res) => {
  const auctions = await Auction.findAll({
    include: "bids",
    where: {
      status: "active",
    },
  });

  res.json(auctions);
};
