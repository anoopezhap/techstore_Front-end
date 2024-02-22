import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { Provider } from "react-redux";
import store from "./store.js";
import { refresh } from "./features/auth/queries.js";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
      retry: (failureCount, err) => {
        if (err?.response?.status === 403) {
          return false;
        }

        return failureCount <= 1;
      },
    },
  },
  // queryCache: new QueryCache({
  //   onError: (err) => {
  //     if (err?.response?.status === 403) {
  //       console.log("inside cache error");
  //       const access = refresh();
  //       console.log("inside query cache", access);
  //     }
  //   },
  // }),
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <App />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
