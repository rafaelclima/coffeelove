import { createOrderFormSchema } from "./schema";
import { z } from "zod";

interface Location {
  type: string;
  coordinates: {
    longitude: string;
    latitude: string;
  };
}

export interface CepData {
  cep: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  service: string;
  location: Location;
}

export type FormData = z.infer<typeof createOrderFormSchema>;
