import { z } from "zod";

export const createOrderFormSchema = z
  .object({
    cep: z.string().min(9, "Informe um CEP válido"),
    rua: z.string().min(1, "Campo é obrigatório"),
    numero: z.string().min(1, "Campo é obrigatório"),
    complemento: z.string().min(1, "Campo é obrigatório"),
    bairro: z.string().min(1, "Campo é obrigatório"),
    cidade: z.string().min(1, "Campo é obrigatório"),
    uf: z.string().min(1, "Campo é obrigatório"),
    formaPagamento: z.string().min(1, "Campo é obrigatório"),
  })
  .transform((field) => ({
    cep: field.cep,
    rua: field.rua,
    numero: field.numero,
    complemento: field.complemento,
    bairro: field.bairro,
    cidade: field.cidade,
    uf: field.uf,
    formaPagamento: field.formaPagamento,
  }));
