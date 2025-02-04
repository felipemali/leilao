import { RouteObject } from "react-router-dom";
import { Home } from "@/pages/Home";
import CreateAuction from "@/pages/CreateAuction";
import AuctionDetail from "@/pages/AuctionDetail";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/criar-leilao",
    element: <CreateAuction />,
  },
  {
    path: "/leilao/:id",
    element: <AuctionDetail />,
  },
];

export default routes;
