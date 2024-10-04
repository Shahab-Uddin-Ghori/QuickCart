import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
// import ModeThemeContext from "./Context/ModeThemeContext.jsx"; // Importing ModeThemeContext
import { UserProvider } from "./Context/UserProvider.jsx"; // Importing UserProvider
import { AdProvider } from "./Context/AdProvider.jsx";
import CartContextProvider from "./Context/CartContextProvider.jsx";

// Rendering the application
createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <ModeThemeContext> */}
    <UserProvider>
      <AdProvider>
        <CartContextProvider>
          <App />
        </CartContextProvider>
      </AdProvider>
    </UserProvider>
    {/* </ModeThemeContext> */}
  </StrictMode>
);
