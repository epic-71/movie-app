import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./Redux/Store.jsx";
import { MovieDetailsContextProvider } from "./Context/MovieDetailsContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <MovieDetailsContextProvider>
          <App />
        </MovieDetailsContextProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
