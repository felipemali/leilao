import { AuctionCard } from "@/components/AuctionCard";
import { useNavigate } from "react-router-dom";
import { useFetchAuctions } from "@/api";
import Button from "@/components/ui/button";

export const Home = () => {
  const navigate = useNavigate();
  const auctions = useFetchAuctions();

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-serif text-4xl">Centro de Leilões</h1>
        <Button
          className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-lg"
          onClick={() => navigate("/criar-leilao")}
        >
          Criar um Novo Leilão
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {auctions.map((auction) => (
          <AuctionCard key={auction.id} auction={auction} />
        ))}
      </div>
    </div>
  );
};
