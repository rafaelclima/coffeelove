import {
  Banknote,
  CreditCard,
  DollarSign,
  Landmark,
  MapPinned,
} from "lucide-react";
import styles from "./Checkout.module.css";
import { SetStateAction, useState } from "react";
import { CheckoutItens } from "../../components/CheckoutItens/CheckoutItens";

export function Checkout() {
  const [escolha, setEscolha] = useState("");

  const handleEscolha = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setEscolha(event.target.value);
  };

  return (
    <main className={styles["checkout-container"]}>
      <div className={styles["checkout-order"]}>
        <h2>Complete seu pedido</h2>
        <section className={styles["checkout-address"]}>
          <div className={styles["address-title"]}>
            <MapPinned
              size={22}
              color="#C47F17"
              strokeWidth={1.25}
              absoluteStrokeWidth
            />
            <div>
              <h3>Endereço de entrega</h3>
              <p>Informe o endereço onde deseja receber seu pedido</p>
            </div>
          </div>

          <form action="submit" className={styles["grid-form"]}>
            <input type="number" name="cep" id={styles.cep} placeholder="CEP" />
            <input type="text" name="rua" id={styles.rua} placeholder="Rua" />
            <input
              type="number"
              name="numero"
              id={styles.numero}
              placeholder="Número"
            />
            <input
              type="text"
              name="complemento"
              id={styles.complemento}
              placeholder="Complemento"
            />
            <input
              type="text"
              name="bairro"
              id={styles.bairro}
              placeholder="Bairro"
            />
            <input
              type="text"
              name="cidade"
              id={styles.cidade}
              placeholder="Cidade"
            />
            <input type="text" name="uf" id={styles.uf} placeholder="UF" />
          </form>
        </section>

        <section className={styles["checkout-choose-payment"]}>
          <div className={styles["payment-title"]}>
            <DollarSign
              size={22}
              color="#8047F8"
              strokeWidth={1.25}
              absoluteStrokeWidth
            />
            <div>
              <h3>Pagamento</h3>
              <p>
                O pagamento é feito na entrega. Escolha a forma que deseja pagar
              </p>
            </div>
          </div>

          <div className={styles["payment-container"]}>
            <label
              className={`${styles["payment-option"]} ${
                escolha === "opcao1" && styles["payment-selected"]
              }`}
            >
              <input
                type="radio"
                value="opcao1"
                checked={escolha === "opcao1"}
                onChange={handleEscolha}
              />
              <CreditCard
                size={16}
                color="#8047F8"
                strokeWidth={1.25}
                absoluteStrokeWidth
              />
              <span>Cartão de crédito</span>
            </label>

            <label
              className={`${styles["payment-option"]} ${
                escolha === "opcao2" && styles["payment-selected"]
              }`}
            >
              <input
                type="radio"
                value="opcao2"
                checked={escolha === "opcao2"}
                onChange={handleEscolha}
              />
              <Landmark
                size={16}
                color="#8047F8"
                strokeWidth={1.25}
                absoluteStrokeWidth
              />
              <span>Cartão de débito</span>
            </label>

            <label
              className={`${styles["payment-option"]} ${
                escolha === "opcao3" && styles["payment-selected"]
              }`}
            >
              <input
                type="radio"
                value="opcao3"
                checked={escolha === "opcao3"}
                onChange={handleEscolha}
              />
              <Banknote
                size={16}
                color="#8047F8"
                strokeWidth={1.25}
                absoluteStrokeWidth
              />
              <span>Dinheiro</span>
            </label>
          </div>
        </section>
      </div>

      <section className={styles["checkout-confirm-order"]}>
        <h2>Cafés selecionados</h2>
        <div className={styles["confirm-container"]}>
          <CheckoutItens />
          <hr />
          <CheckoutItens />
          <hr />

          <div className={styles["confirm-total-container"]}>
            <div className={styles["confirm-total-itens"]}>
              <p>Total de itens</p>
              <span>R$ 99,99</span>
            </div>
            <div className={styles["confirm-total-delivery"]}>
              <p>Entrega</p>
              <span>R$ 9,99</span>
            </div>
            <div className={styles["confirm-total-totalPrice"]}>
              <p>Total</p>
              <span>R$ 99,99</span>
            </div>
          </div>

          <button className={styles["confirm-total-button"]}>
            Confirmar pedido
          </button>
        </div>
      </section>
    </main>
  );
}
