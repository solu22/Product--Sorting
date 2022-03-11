import { Product } from "../types";
import { InitialStateType } from "./Context";

export type Action =
  | {
      type: "ADD_TO_CART";
      payload: Product;
    }
  | {
      type: "REMOVE_FROM_CART";
      payload: any;
    }
  | {
      type: "CHANGE_CART_QTY";
      payload: { id: string; qty: any };
    }
  | {
      type: "SORT_BY_PRICE";
      payload: string;
    }
  | {
      type: "FILTER_BY_STOCK";
    }
  | {
      type: "FILTER_BY_RATING";
      payload: number | any;
    }
  | {
      type: "FILTER_BY_SEARCH";
      payload: string;
    }
  | {
      type: "CLEAR_FILTER";
      
    };

    

export const reducer = (state: InitialStateType, action: Action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, qty: 1 }],
      };

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.map((c: any) => c.id !== action.payload.id),
      };

    case "CHANGE_CART_QTY":
      return {
        ...state,
        cart: state.cart.filter((c: any) =>
          c.id === action.payload.id ? (c.qty = action.payload.qty) : c.qty
        ),
      };

    case "SORT_BY_PRICE":
      return { ...state, sort: action.payload };
    case "FILTER_BY_STOCK":
      return { ...state, byStock: !state.byStock };
    case "FILTER_BY_RATING":
      return { ...state, byRating: action.payload };
    case "FILTER_BY_SEARCH":
      return { ...state, search: action.payload };
    case "CLEAR_FILTER":
        return {
        //   sort: false,
        //   byStock: false,
        //   byRating: 0,
        //   search: "",

          ...state,
          sort: false,
          byStock: false,
          byRating: 0,
          search: "",
        };
    // eslint-disable-next-line no-fallthrough
    default:
      return state;
  }
};
