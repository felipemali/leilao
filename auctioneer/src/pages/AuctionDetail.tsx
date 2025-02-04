import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Button from "@/components/ui/button";
import { useAuctionDetail, useTimeRemaining } from "@/hooks";

const AuctionDetail = () => {
  const navigate = useNavigate();
  const { auction } = useAuctionDetail();
  const { timeRemaining } = useTimeRemaining(auction);

  const formatTime = (date: string) => {
    return new Intl.DateTimeFormat("pt-BR", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(new Date(date));
  };

  if (!auction) {
    return (
      <div className="container py-8 text-center">
        <h1 className="text-2xl font-serif mb-4">Nenhum leilão encontrado</h1>
        <Button onClick={() => navigate("/")}>
          Voltar para Página Inicial
        </Button>
      </div>
    );
  }

  return (
    <div className="container py-8 max-w-4xl mx-auto">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-3xl font-serif mb-2">
                  {auction.title}
                </CardTitle>
                <Badge status={auction.status}>
                  {auction.status === "active"
                    ? "Em andamento"
                    : auction.status === "completed"
                    ? "Finalizado"
                    : "Cancelado"}
                </Badge>
              </div>
              <Button variant="outline" onClick={() => navigate("/")}>
                Voltar para Página Inicial
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="aspect-video relative rounded-lg overflow-hidden">
              <img
                src={auction.imageUrl}
                alt={auction.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Detalhes</h3>
                <p className="text-muted-foreground">{auction.description}</p>
                <div className="space-y-2">
                  <p>
                    <span className="font-medium">Lance Inicial:</span> R${" "}
                    {auction.startBid}
                  </p>
                  {auction.status === "active" && (
                    <p>
                      <span className="font-medium">Tempo Restante:</span>{" "}
                      {timeRemaining}
                    </p>
                  )}
                </div>

                {auction.status !== "active" && (
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="font-medium text-center">
                      {auction.status === "completed"
                        ? "Este leilão foi finalizado"
                        : "Este leilão foi cancelado"}
                    </p>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Histórico de Lances</h3>
                <div className="space-y-2">
                  {auction.bids?.map((bid) => (
                    <div
                      key={bid.id}
                      className="flex justify-between items-center p-2 bg-muted rounded-lg"
                    >
                      <span>{bid.username}</span>
                      <div className="text-right">
                        <p className="font-medium">R$ {bid.amount}</p>
                        <p className="text-sm text-muted-foreground">
                          {formatTime(bid.createdAt)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AuctionDetail;
