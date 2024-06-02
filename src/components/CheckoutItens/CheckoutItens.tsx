import { Minus, Plus, Trash2 } from "lucide-react";
import styles from "./CheckoutItens.module.css";

import coffee from "../../assets/coffees/Expresso.svg";

export function CheckoutItens() {
  return (
    <div className={styles["checkout-itens-container"]}>
      <div className={styles["checkout-itens-image"]}>
        <img src={coffee} alt="Description AQUI" />
      </div>
      <div className={styles["checkout-itens-description"]}>
        <h3>Expresso Tradicional</h3>
        <div className={styles["checkout-itens-actions"]}>
          <div className={styles["checkout-quantity-input"]}>
            <span>
              <Minus
                size={14}
                color="#8047F8"
                strokeWidth={1.75}
                absoluteStrokeWidth
              />
            </span>
            <p>1</p>
            <span>
              <Plus
                size={14}
                color="#8047F8"
                strokeWidth={1.75}
                absoluteStrokeWidth
              />
            </span>
          </div>

          <div className={styles["checkout-itens-button"]}>
            <button>
              <Trash2
                size={16}
                color="#8047F8"
                strokeWidth={1.25}
                absoluteStrokeWidth
              />{" "}
              Remover
            </button>
          </div>
        </div>
      </div>
      <div className={styles["checkout-itens-price"]}>
        <p>R$ 99,99</p>
      </div>
    </div>
  );
}
