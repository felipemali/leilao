import { CreateAuctionForm } from "@/components/CreateAuctionForm";

const CreateAuction = () => {
  return (
    <div className="container py-8">
      <h1 className="font-serif text-4xl mb-8 text-center">
        Criando Novo Leilão
      </h1>
      <CreateAuctionForm />
    </div>
  );
};

export default CreateAuction;
