import { SubmitHandler, useForm } from "react-hook-form";
import axios, { AxiosError } from "axios";
import { useCallback, useContext, useEffect } from "react";

import { CepData } from "../pages/checkout/types";
import { CheckoutContext } from "../contexts/CheckoutContext";
import { FormData } from "../pages/checkout/types";
import { createOrderFormSchema } from "../pages/checkout/schema";
import { insertMaskOnCep } from "../functions/cepMask";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";

export const useCepValidate = () => {
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
  const toast = useToast();
  const navigate = useNavigate();

  const { setItensOnSuccessPage, setCoffeesOnCart } =
    useContext(CheckoutContext);

  const handleSetData = useCallback(
    (data: CepData) => {
      setValue("cidade", data.city);
      setValue("bairro", data.neighborhood);
      setValue("rua", data.street);
      setValue("uf", data.state);
    },
    [setValue]
  );

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
    if (data) {
      if (data.formaPagamento === "creditCard") {
        data.formaPagamento = "Cartão de crédito";
      } else if (data.formaPagamento === "debitCard") {
        data.formaPagamento = "Cartão de débito";
      } else {
        data.formaPagamento = "Dinheiro";
      }
      setItensOnSuccessPage(data);
      setCoffeesOnCart([]);
      navigate("/success");
    }
  };

  const handleConfirmOrder = async () => {
    const isValid = await trigger();
    if (isValid) {
      handleSubmit(onSubmit)();
    } else {
      console.log("Validation failed");
    }
  };
  return {
    cep,
    errors,
    register,
    setValue,
    handleConfirmOrder,
    onSubmit,
    handleSubmit,
  };
};
