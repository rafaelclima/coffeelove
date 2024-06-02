import { RouterProvider } from "react-router-dom";
import styles from "./App.module.css";
import { router } from "./Router";

function App() {
  return (
    <div className={styles.wrapper}>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
