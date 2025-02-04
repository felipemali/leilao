import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Auction } from "@/models/Auction";
import Button from "./ui/button";
import Label from "./ui/label";
import { useSocket } from "@/hooks";
import { imageUploader } from "@/lib/imageUploader";

const getLocalDateTime = (timestamp) => {
  const date = new Date(timestamp);
  const offset = date.getTimezoneOffset() * 60000;
  const localISOTime = new Date(date.getTime() - offset)
    .toISOString()
    .slice(0, 16);
  return localISOTime;
};

export const CreateAuctionForm = () => {
  const socket = useSocket();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<Auction>>({
    title: "",
    description: "",
    startBid: 0,
    duration: 0,
    imageUrl: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    console.log({ formData });

    socket.emit("createAuction", formData, (auction) => {
      setLoading(false);

      navigate(`/leilao/${auction.id}`);
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-xl mx-auto">
      <div className="space-y-2">
        <Label>Título do Leilão</Label>
        <Input
          id="title"
          required
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="insira o titulo do leilão..."
        />
      </div>

      <div className="space-y-2">
        <Label>Descrição</Label>
        <textarea
          id="description"
          required
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          placeholder="descreva seu item..."
          className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[100px]"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Lance Inicial (R$)</Label>

          <Input
            id="startingBid"
            type="number"
            required
            min="0"
            value={formData.startBid.toString()}
            onChange={(e) =>
              setFormData({ ...formData, startBid: Number(e.target.value) })
            }
            placeholder="0.00"
          />
        </div>

        <div className="space-y-2">
          <Label>Duração (minutos)</Label>
          <Input
            id="duration"
            type="datetime-local"
            required
            min={getLocalDateTime(Date.now())}
            value={getLocalDateTime(formData.duration)}
            onChange={(e) => {
              setFormData({
                ...formData,
                duration: new Date(e.target.value).getTime(),
              });
            }}
            placeholder="Insira a duração"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Imagem do Produto</Label>
        <Input
          id="image"
          type="file"
          required
          placeholder="Escolha uma foto do produto"
          accept="image/png,image/jpeg"
          onChange={async (e) => {
            if (e.target.files && e.target.files.length > 0) {
              setFormData({
                ...formData,
                imageUrl: await imageUploader(e.target.files[0]),
              });
            }
          }}
        />
      </div>

      <div className="flex justify-end space-x-4">
        <Button variant="outline" onClick={() => navigate("/")}>
          Cancelar
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? "Iniciando..." : "Iniciar Leilão"}
        </Button>
      </div>
    </form>
  );
};
