import { RouteObject } from "react-router-dom";
import { Home } from "@/pages/Home";
import Live from "@/pages/Live";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/leilao/:id",
    element: <Live />,
  },
];

export default routes;
