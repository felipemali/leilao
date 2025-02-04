import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Button from "@/components/ui/button";
import { useAuctionDetail, useTimeRemaining } from "@/hooks";
import { NewBid } from "@/components/NewBid";
import { Modal } from "@/components/ui/modal";

const Live = () => {
  const navigate = useNavigate();
  const { auction } = useAuctionDetail();
  const { timeRemaining } = useTimeRemaining(auction);

  if (!auction) {
    return <h1>Loading...</h1>;
  }

  if (auction.status !== "active") {
    const isCompleted = auction.status === "completed";
    const title = isCompleted ? "Leilão Finalizado" : "Leilão Cancelado";

    const winner = auction.bids[auction.bids.length - 1];

    return (
      <Modal isOpen={true} title={title}>
        <div className="flex flex-col space-y-4">
          {isCompleted && (
            <div>
              <h2 className="text-base font-semibold">
                Vencedor: {winner.username}
              </h2>
              <h3 className="text-base font-semibold">
                Lance: R$ {winner.amount}
              </h3>
            </div>
          )}

          <Button variant="secondary" onClick={() => navigate("/")}>
            Voltar para Página Inicial
          </Button>
        </div>
      </Modal>
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
                  {auction?.title}
                </CardTitle>
              </div>
              <Button variant="outline" onClick={() => navigate("/")}>
                Voltar para Página Inicial
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="aspect-video relative rounded-lg overflow-hidden">
              <img
                src={auction?.imageUrl}
                alt={auction?.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              image
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Detalhes</h3>
                <p className="text-muted-foreground">{auction?.description}</p>
                <div className="space-y-2">
                  <p>
                    <span className="font-medium">Lance Inicial:</span> R${" "}
                    {auction?.startBid}
                  </p>

                  <div className="p-4 bg-muted rounded-lg mt-2 w-[70%]">
                    <p className="font-medium text-center">{timeRemaining}</p>
                  </div>
                  <NewBid auction={auction} />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Lista de Lances</h3>
                <div className="space-y-2">
                  {auction?.bids?.map((bid) => (
                    <div
                      key={bid.id}
                      className="flex justify-between items-center p-2 bg-muted rounded-lg"
                    >
                      <span>{bid.username}</span>
                      <div className="text-right">
                        <p className="font-medium">R$ {bid.amount}</p>
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

export default Live;
