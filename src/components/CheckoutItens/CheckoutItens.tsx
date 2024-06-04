import { Minus, Plus, Trash2 } from "lucide-react";

import { CheckoutContext } from "../../contexts/CheckoutContext";
import styles from "./CheckoutItens.module.css";
import { useContext } from "react";

interface CoffeeCheckoutProps {
  id: number;
}

export function CheckoutItens({ id }: CoffeeCheckoutProps) {
  const { coffeesOnCart, handleChangeQuantityCoffeeOnCheckout } =
    useContext(CheckoutContext);
  const coffeeOnCartCheckout = coffeesOnCart.find((coffee) => coffee.id === id);
  const price = coffeeOnCartCheckout?.price ?? 0;
  const quantity = coffeeOnCartCheckout?.quantidade ?? 1;
  const finalPriceCoffeeOnCheckout = price * quantity;

  return (
    <div className={styles["checkout-itens-container"]}>
      <div className={styles["checkout-itens-image"]}>
        <img
          src={coffeeOnCartCheckout?.img}
          alt="imagem de uma xícara de café"
        />
      </div>
      <div className={styles["checkout-itens-description"]}>
        <h3>{coffeeOnCartCheckout?.coffeeName}</h3>
        <div className={styles["checkout-itens-actions"]}>
          <div className={styles["checkout-quantity-input"]}>
            <span onClick={() => handleChangeQuantityCoffeeOnCheckout(id, -1)}>
              <Minus
                size={14}
                color="#8047F8"
                strokeWidth={1.75}
                absoluteStrokeWidth
              />
            </span>
            <p>{coffeeOnCartCheckout?.quantidade}</p>
            <span onClick={() => handleChangeQuantityCoffeeOnCheckout(id, 1)}>
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
        <p>R$ {finalPriceCoffeeOnCheckout.toFixed(2)}</p>
      </div>
    </div>
  );
}
