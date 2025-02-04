import { AuctionCard } from "@/components/AuctionCard";
import { useAuctions } from "@/hooks";

export const Home = () => {
  const { auctions } = useAuctions();

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-serif text-4xl">Leilões ativos no momento</h1>
      </div>
      {auctions.length === 0 && (
        <h1 className="text-lg">Nenhum leilão ativo no momento.</h1>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {auctions.map((auction) => (
          <AuctionCard key={auction.id} auction={auction} />
        ))}
      </div>
    </div>
  );
};
