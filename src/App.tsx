import { ChakraProvider } from "@chakra-ui/react";
import { CheckoutContextProvider } from "./contexts/CheckoutContext";
import { RouterProvider } from "react-router-dom";
import { router } from "./Router";
import styles from "./App.module.css";

function App() {
  return (
    <div className={styles.wrapper}>
      <ChakraProvider>
        <CheckoutContextProvider>
          <RouterProvider router={router} />
        </CheckoutContextProvider>
      </ChakraProvider>
    </div>
  );
}

export default App;
