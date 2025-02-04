import { Bid } from "./Bid";

export type Auction = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  status: "active" | "completed" | "canceled";
  highestBid?: number;
  participantCount?: number;
  personHighestBid?: string;
  startBid: number;
  duration: number;
  createdAt: string;
  bids?: Bid[];
};
