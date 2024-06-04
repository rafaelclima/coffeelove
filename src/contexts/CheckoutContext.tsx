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

interface CheckoutContextProps {
  coffeesList: CoffeeCheckoutProps[];
  handleChangeAmountCoffee: (id: number, delta: number) => void;
  coffeesOnCart: CoffeeCheckoutProps[];
  handleAddCoffeeOnCheckout: (id: number) => void;
  handleChangeQuantityCoffeeOnCheckout: (id: number, delta: number) => void;
  handleRemoveCoffeeOnCheckout: (id: number) => void;
}

export const CheckoutContext = createContext<CheckoutContextProps>({
  coffeesList: [],
  handleChangeAmountCoffee: () => {},
  coffeesOnCart: [],
  handleAddCoffeeOnCheckout: () => {},
  handleChangeQuantityCoffeeOnCheckout: () => {},
  handleRemoveCoffeeOnCheckout: () => {},
});

export function CheckoutContextProvider({ children }: { children: ReactNode }) {
  const { coffees } = coffeeMenu;
  const [coffeesOnCart, setCoffeesOnCart] = useState<CoffeeCheckoutProps[]>([]);
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

  const coffeesContext: CheckoutContextProps = {
    coffeesList,
    handleChangeAmountCoffee,
    coffeesOnCart,
    handleAddCoffeeOnCheckout,
    handleChangeQuantityCoffeeOnCheckout,
    handleRemoveCoffeeOnCheckout,
  };

  return (
    <CheckoutContext.Provider value={coffeesContext}>
      {children}
    </CheckoutContext.Provider>
  );
}
