import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import { hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./component/App";
import "./index.css";

if (typeof window !== "undefined") {
  hydrateRoot(
    document.querySelector("#root"),
    <BrowserRouter basename="/app">
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </BrowserRouter>
  );
}
