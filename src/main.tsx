import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import { ApolloProvider } from "@apollo/client/react";
import apolloClient from "@utils/api/apolloClient";
import "./index.css";
import { AppRouter } from "./router/AppRouter.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={apolloClient}>
      <AppRouter />
    </ApolloProvider>
  </StrictMode>
);
