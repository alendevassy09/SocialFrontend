import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "@mui/material/styles";
import { Provider } from "react-redux";
import { theme } from "./Theme/Theme";
import store from "./Redux/Store";
import { GoogleOAuthProvider } from "@react-oauth/google";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <GoogleOAuthProvider clientId="531710696499-tksflm1b3jbe0gd428i4k8a0utqgorrq.apps.googleusercontent.com">
        <App />
      </GoogleOAuthProvider>
    </Provider>
  </ThemeProvider>
   </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
