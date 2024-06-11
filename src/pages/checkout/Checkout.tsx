import {
  Banknote,
  CreditCard,
  DollarSign,
  Landmark,
  MapPinned,
} from "lucide-react";
import { useContext, useEffect, useState } from "react";

import { CheckoutContext } from "../../contexts/CheckoutContext";
import { CheckoutItens } from "../../components/CheckoutItens/CheckoutItens";
import React from "react";
import styles from "./Checkout.module.css";
import { useCepValidate } from "../../hooks/useCepValidate";
import { useNavigate } from "react-router-dom";

export function Checkout() {
  const { coffeesOnCart } = useContext(CheckoutContext);
  const [paymentChoose, setPaymentChoose] = useState("");
  const {
    errors,
    cep,
    register,
    setValue,
    handleConfirmOrder,
    onSubmit,
    handleSubmit,
  } = useCepValidate();

  const navigate = useNavigate();

  const totalItensOnCart = coffeesOnCart.reduce((acc, item) => {
    acc += item.quantidade;
    return acc;
  }, 0);

  const totalOrderPrice = coffeesOnCart.reduce((acc, item) => {
    acc += item.quantidade * item.price;
    return acc;
  }, 0);

  const deliveryPrice = 9.99;

  useEffect(() => {
    if (coffeesOnCart.length <= 0) {
      navigate("/");
    }
  }, [coffeesOnCart, navigate]);

  const handlePaymentChoose = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentChoose(event.target.value);
    setValue("formaPagamento", event.target.value);
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

          <form
            onSubmit={handleSubmit(onSubmit)}
            className={styles["grid-form"]}
          >
            <input
              type="text"
              id={styles.cep}
              placeholder="CEP"
              maxLength={9}
              {...register("cep")}
            />
            <input
              type="text"
              id={styles.rua}
              placeholder="Rua"
              {...register("rua")}
              className={errors.rua ? styles.error : ""}
            />
            <input
              type="number"
              id={styles.numero}
              placeholder="Número"
              {...register("numero")}
              className={errors.numero ? styles.error : ""}
            />
            <input
              type="text"
              id={styles.complemento}
              placeholder="Complemento"
              {...register("complemento")}
              className={errors.complemento ? styles.error : ""}
            />
            <input
              type="text"
              id={styles.bairro}
              placeholder="Bairro"
              {...register("bairro")}
              className={errors.bairro ? styles.error : ""}
            />
            <input
              type="text"
              id={styles.cidade}
              placeholder="Cidade"
              {...register("cidade")}
              className={errors.cidade ? styles.error : ""}
            />
            <input
              type="text"
              id={styles.uf}
              placeholder="UF"
              {...register("uf")}
              className={errors.uf ? styles.error : ""}
            />
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
                paymentChoose === "creditCard" && styles["payment-selected"]
              }`}
            >
              <input
                type="radio"
                value="creditCard"
                checked={paymentChoose === "creditCard"}
                onChange={handlePaymentChoose}
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
                paymentChoose === "debitCard" && styles["payment-selected"]
              }`}
            >
              <input
                type="radio"
                value="debitCard"
                checked={paymentChoose === "debitCard"}
                onChange={handlePaymentChoose}
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
                paymentChoose === "cash" && styles["payment-selected"]
              }`}
            >
              <input
                type="radio"
                value="cash"
                checked={paymentChoose === "cash"}
                onChange={handlePaymentChoose}
              />
              <Banknote
                size={16}
                color="#8047F8"
                strokeWidth={1.25}
                absoluteStrokeWidth
              />
              <span>Dinheiro</span>
            </label>
            {cep.length === 9 && errors.formaPagamento && (
              <span className={styles["payment-error"]}>
                É necessário escolher uma forma de pagamento.
              </span>
            )}
          </div>
        </section>
      </div>

      <section className={styles["checkout-confirm-order"]}>
        <h2>Cafés selecionados</h2>
        <div className={styles["confirm-container"]}>
          {coffeesOnCart &&
            coffeesOnCart.map((coffee) => (
              <React.Fragment key={coffee.id}>
                <CheckoutItens key={coffee.id} id={coffee.id} />
                <hr />
              </React.Fragment>
            ))}

          <div className={styles["confirm-total-container"]}>
            <div className={styles["confirm-total-itens"]}>
              <p>Total de itens</p>
              <span>{totalItensOnCart}</span>
            </div>
            <div className={styles["confirm-total-delivery"]}>
              <p>Entrega</p>
              <span>R$ {deliveryPrice}</span>
            </div>
            <div className={styles["confirm-total-totalPrice"]}>
              <p>Total</p>
              <span>R$ {(totalOrderPrice + deliveryPrice).toFixed(2)}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleConfirmOrder}
            disabled={cep.length > 0 ? false : true}
            title={
              cep.length > 0
                ? ""
                : "Preencha o endereço e escolha a forma de pagamento!"
            }
            className={styles["confirm-total-button"]}
          >
            Confirmar pedido
          </button>
        </div>
      </section>
    </main>
  );
}
