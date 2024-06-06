import {
  Banknote,
  CreditCard,
  DollarSign,
  Landmark,
  MapPinned,
} from "lucide-react";
import { SetStateAction, useContext, useEffect, useState } from "react";
import axios, { AxiosError } from "axios";

import { CheckoutContext } from "../../contexts/CheckoutContext";
import { CheckoutItens } from "../../components/CheckoutItens/CheckoutItens";
import React from "react";
import styles from "./Checkout.module.css";
import useDebounce from "../../hooks/useDebounce";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

interface Location {
  type: string;
  coordinates: {
    longitude: string;
    latitude: string;
  };
}

interface CepData {
  cep: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  service: string;
  location: Location;
}

export function Checkout() {
  const { coffeesOnCart } = useContext(CheckoutContext);
  const [escolha, setEscolha] = useState("");
  const [address, setAddress] = useState<CepData | null>(null);
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    if (coffeesOnCart.length <= 0) {
      navigate("/");
    }
  }, [coffeesOnCart, navigate]);

  const handleEscolha = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setEscolha(event.target.value);
  };

  const totalItensOnCart = coffeesOnCart.reduce((acc, item) => {
    acc += item.quantidade;
    return acc;
  }, 0);

  const totalOrderPrice = coffeesOnCart.reduce((acc, item) => {
    acc += item.quantidade * item.price;
    return acc;
  }, 0);

  const [inputValue, setInputValue] = useState("");
  const debouncedSearchValues = useDebounce(inputValue, 800);

  function handleChange(e: { target: { value: string } }) {
    const { value } = e.target;
    setInputValue(value);
  }

  async function fetchCepData(cep: string): Promise<CepData | null> {
    try {
      const response = await axios.get<CepData>(
        `https://brasilapi.com.br/api/cep/v2/${cep}`
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.status === 404) {
          toast({
            title: "CEP não encontrado",
            status: "error",
            duration: 1500,
            position: "top",
            isClosable: true,
          });
        } else if (axiosError.request) {
          toast({
            title: "A requisição falhou, tente novamente.",
            status: "error",
            duration: 1500,
            position: "top",
            isClosable: true,
          });
        }
      }
      console.error("Erro:", error);
      return null;
    }
  }

  useEffect(() => {
    if (debouncedSearchValues.length >= 8) {
      fetchCepData(debouncedSearchValues).then((data) => {
        if (data) {
          setAddress(data);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchValues]);

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
            <input
              type="number"
              name="cep"
              id={styles.cep}
              placeholder="CEP"
              value={inputValue}
              onChange={handleChange}
            />
            <input
              type="text"
              name="rua"
              id={styles.rua}
              placeholder="Rua"
              onChange={handleChange}
              value={address?.street ? address.street : ""}
            />
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
              value={address?.neighborhood}
              onChange={handleChange}
            />
            <input
              type="text"
              name="cidade"
              id={styles.cidade}
              placeholder="Cidade"
              value={address?.city}
              onChange={handleChange}
            />
            <input
              type="text"
              name="uf"
              id={styles.uf}
              placeholder="UF"
              value={address?.state}
              onChange={handleChange}
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
              <span>R$ 9,99</span>
            </div>
            <div className={styles["confirm-total-totalPrice"]}>
              <p>Total</p>
              <span>R$ {totalOrderPrice.toFixed(2)}</span>
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
