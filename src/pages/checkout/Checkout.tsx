import {
  Banknote,
  CreditCard,
  DollarSign,
  Landmark,
  MapPinned,
} from "lucide-react";
import {
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import axios, { AxiosError } from "axios";

import { CheckoutContext } from "../../contexts/CheckoutContext";
import { CheckoutItens } from "../../components/CheckoutItens/CheckoutItens";
import React from "react";
import { insertMaskOnCep } from "../../functions/cepMask";
import styles from "./Checkout.module.css";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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

const createOrderFormSchema = z
  .object({
    cep: z.string().min(9, "Informe um CEP válido"),
    rua: z.string().min(1, "Campo é obrigatório"),
    numero: z.string().min(1, "Campo é obrigatório"),
    complemento: z.string().min(1, "Campo é obrigatório"),
    bairro: z.string().min(1, "Campo é obrigatório"),
    cidade: z.string().min(1, "Campo é obrigatório"),
    uf: z.string().min(1, "Campo é obrigatório"),
  })
  .transform((field) => ({
    cep: field.cep,
    rua: field.rua,
    numero: field.numero,
    complemento: field.complemento,
    bairro: field.bairro,
    cidade: field.cidade,
    uf: field.uf,
  }));

type FormData = z.infer<typeof createOrderFormSchema>;

export function Checkout() {
  const { coffeesOnCart } = useContext(CheckoutContext);
  const [escolha, setEscolha] = useState("");

  const navigate = useNavigate();
  const toast = useToast();

  const totalItensOnCart = coffeesOnCart.reduce((acc, item) => {
    acc += item.quantidade;
    return acc;
  }, 0);

  const totalOrderPrice = coffeesOnCart.reduce((acc, item) => {
    acc += item.quantidade * item.price;
    return acc;
  }, 0);

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    criteriaMode: "all",
    mode: "all",
    resolver: zodResolver(createOrderFormSchema),
    defaultValues: {
      cep: "",
      rua: "",
      numero: "",
      complemento: "",
      bairro: "",
      cidade: "",
      uf: "",
    },
  });

  const cep = watch("cep");

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

  const handleSetData = useCallback((data: CepData) => {
    setValue("cidade", data.city);
    setValue("bairro", data.neighborhood);
    setValue("rua", data.street);
    setValue("uf", data.state);
  }, []);

  const handleFetchCepData = useCallback(
    async (clientCep: string) => {
      try {
        const { data } = await axios.get<CepData>(
          `https://brasilapi.com.br/api/cep/v2/${clientCep}`
        );
        handleSetData(data);
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
    },
    [handleSetData, toast]
  );

  useEffect(() => {
    setValue("cep", insertMaskOnCep(cep));

    if (cep.length !== 9) return;
    if (cep.length === 9) {
      const cepWithoutMask = cep.replace("-", "");
      handleFetchCepData(cepWithoutMask);
    }
  }, [handleFetchCepData, setValue, cep]);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
  };

  const handleConfirmOrder = async () => {
    const isValid = await trigger();
    if (isValid) {
      handleSubmit(onSubmit)();
    } else {
      console.log("Validation failed");
    }
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

          <button
            type="button"
            onClick={handleConfirmOrder}
            className={styles["confirm-total-button"]}
          >
            Confirmar pedido
          </button>
        </div>
      </section>
    </main>
  );
}
