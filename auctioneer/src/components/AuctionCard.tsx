import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Auction } from "@/models/Auction";

type Props = {
  auction: Auction;
};

export const AuctionCard = ({ auction }: Props) => {
  const navigate = useNavigate();

  return (
    <Card
      className="cursor-pointer hover:shadow-lg transition-shadow animate-fade-in"
      onClick={() => navigate(`/leilao/${auction.id}`)}
    >
      <CardHeader>
        <div className="relative h-48 w-full mb-4">
          <img
            src={auction.imageUrl}
            alt={auction.title}
            className="absolute inset-0 w-full h-full object-cover rounded-t-lg"
          />
        </div>
        <div className="flex justify-between items-center">
          <CardTitle className="font-serif text-xl">{auction.title}</CardTitle>
          <Badge status={auction.status}>
            {auction.status.charAt(0).toUpperCase() + auction.status.slice(1)}
          </Badge>
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-muted-foreground line-clamp-2">
          {auction.description}
        </p>

        {/* {auction.status == "active" && auction.startBid && (
          <p className="mt-2 font-semibold text-primary">
            Lance Inicial: ${auction.startBid.toLocaleString()}
          </p>
        )}
        {auction.status == "active" && auction.duration && (
          <Stopwatch minutes={auction.duration} />
        )}
        {auction.status === "completed" && auction.highestBid && (
          <p className="mt-2 font-semibold text-primary">
            Lance Vencedor: ${auction.highestBid.toLocaleString()}
          </p>
        )} */}
      </CardContent>
    </Card>
  );
};
