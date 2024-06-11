import { ReactNode, createContext, useState } from "react";

import coffeeMenu from "../data.json";

export interface CoffeeCheckoutProps {
  id: number;
  img: string;
  category: string;
  coffeeName: string;
  description: string;
  price: number;
  quantidade: number;
}

interface successItensProps {
  cep: string;
  rua: string;
  numero: string;
  complemento?: string; // Propriedade opcional
  bairro: string;
  cidade: string;
  uf: string;
  formaPagamento: string;
}

interface CheckoutContextProps {
  coffeesList: CoffeeCheckoutProps[];
  coffeesOnCart: CoffeeCheckoutProps[];
  successItens: successItensProps | null;
  setCoffeesOnCart: React.Dispatch<CoffeeCheckoutProps[]>;
  handleChangeAmountCoffee: (id: number, delta: number) => void;
  handleAddCoffeeOnCheckout: (id: number) => void;
  handleChangeQuantityCoffeeOnCheckout: (id: number, delta: number) => void;
  handleRemoveCoffeeOnCheckout: (id: number) => void;
  setItensOnSuccessPage: (data: successItensProps) => void;
}

export const CheckoutContext = createContext<CheckoutContextProps>({
  coffeesList: [],
  coffeesOnCart: [],
  successItens: null,
  setCoffeesOnCart: () => [],
  handleChangeAmountCoffee: () => {},
  handleAddCoffeeOnCheckout: () => {},
  handleChangeQuantityCoffeeOnCheckout: () => {},
  handleRemoveCoffeeOnCheckout: () => {},
  setItensOnSuccessPage: () => {},
});

export function CheckoutContextProvider({ children }: { children: ReactNode }) {
  const { coffees } = coffeeMenu;
  const [coffeesOnCart, setCoffeesOnCart] = useState<CoffeeCheckoutProps[]>([]);
  const [successItens, setSuccessItens] = useState<successItensProps | null>(
    null
  );
  const [coffeesList, setCoffeesList] = useState<CoffeeCheckoutProps[]>(() =>
    coffees.map((coffee: CoffeeCheckoutProps) => ({
      id: coffee.id,
      img: coffee.img,
      category: coffee.category,
      coffeeName: coffee.coffeeName,
      description: coffee.description,
      price: coffee.price,
      quantidade: coffee.quantidade,
    }))
  );

  function handleChangeAmountCoffee(id: number, delta: number) {
    setCoffeesList((state) =>
      state.map((coffee) => {
        if (coffee.id === id) {
          const newQuantidade = (coffee.quantidade ?? 1) + delta;
          return {
            ...coffee,
            quantidade: newQuantidade < 1 ? 1 : newQuantidade,
          };
        } else {
          return coffee;
        }
      })
    );
  }

  function handleChangeQuantityCoffeeOnCheckout(id: number, delta: number) {
    setCoffeesOnCart((state) =>
      state.map((coffee) => {
        if (coffee.id === id) {
          const newQuantidade = (coffee.quantidade ?? 1) + delta;
          return {
            ...coffee,
            quantidade: newQuantidade < 1 ? 1 : newQuantidade,
          };
        } else {
          return coffee;
        }
      })
    );
  }

  function handleAddCoffeeOnCheckout(id: number) {
    const newCoffeeOnCheckout = coffeesList.find((coffee) => coffee.id === id);
    if (newCoffeeOnCheckout) {
      setCoffeesOnCart((state) => [...state, newCoffeeOnCheckout]);
    }
  }

  function handleRemoveCoffeeOnCheckout(id: number) {
    const removeCoffee = coffeesOnCart.filter((coffee) => coffee.id !== id);
    setCoffeesOnCart(removeCoffee);
  }

  function setItensOnSuccessPage(data: successItensProps) {
    setSuccessItens(data);
  }

  const coffeesContext: CheckoutContextProps = {
    coffeesList,
    coffeesOnCart,
    successItens,
    setCoffeesOnCart,
    handleChangeAmountCoffee,
    handleAddCoffeeOnCheckout,
    handleChangeQuantityCoffeeOnCheckout,
    handleRemoveCoffeeOnCheckout,
    setItensOnSuccessPage,
  };

  return (
    <CheckoutContext.Provider value={coffeesContext}>
      {children}
    </CheckoutContext.Provider>
  );
}
