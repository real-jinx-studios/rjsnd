import { createContext, useReducer } from "react";
import Cookies from "js-cookie";

export const Store = createContext();
const initialState = {
  logged_in: Cookies.get("logged_in") === "true",
  checkout: {
    checkoutItems: Cookies.get("checkoutItems")
      ? JSON.parse(Cookies.get("checkoutItems"))
      : [],
  },
};

function reducer(state, action) {
  switch (action.type) {
    case "LOG_IN":
      return { ...state, logged_in: true };
    case "LOG_OUT":
      return { ...state, logged_in: false };
    case "ADD_TO_CHECKOUT_NORMAL": {
      const newItem = action.payload;
      //check if item already exist in checkout
      const existItem = state.checkout.checkoutItems.find(
        (item) =>
          item.name === newItem.name &&
          item.edition === newItem.edition &&
          item.license === newItem.license
      );
      const checkoutItems = existItem
        ? state.checkout.checkoutItems.map((item) =>
            item.name === existItem.name
              ? { ...newItem, quantity: item.quantity + 1 }
              : item
          )
        : [...state.checkout.checkoutItems, newItem];
      Cookies.set("checkoutItems", JSON.stringify(checkoutItems));
      return { ...state, checkout: { ...state.checkout, checkoutItems } };
    }
    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
