export type AuctionAttributes = {
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
};

