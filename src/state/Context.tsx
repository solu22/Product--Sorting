import React, { createContext} from 'react'
import { faker } from '@faker-js/faker'
import { useReducer } from 'react'
import { Action} from './Reducers';
import { useContext } from 'react';



const products = [...Array(10)].map(() => ({
  id: faker.datatype.uuid(),
  name: faker.commerce.productName(),
  price: faker.commerce.price(),
  image: `${faker.image.food()}?random=${Math.round(Math.random() * 1000)}`,
  ratings: faker.random.arrayElement([1, 2, 3, 4, 5]),
  inStock: faker.random.arrayElement([0, 3, 5, 6, 7]),
 
}));

faker.seed(99)

export type InitialStateType = {
  products: typeof products;
  cart: typeof products | any;
  sort: boolean | any;
  byStock :boolean;
  byRating: number | any;
  search: any
};

const initialState: InitialStateType = {
  products: products,
  cart: [],
  sort: false,
  byStock: false,
  byRating: 0,
  search: ""
  
};



const StateContext = createContext<[InitialStateType, React.Dispatch<Action>]>([
  initialState,
  () => initialState,
]);

type StateProviderProps = {
  reducer: React.Reducer<InitialStateType, Action>;
  children: React.ReactElement;
};

export const StateProvider: React.FC<StateProviderProps> = ({reducer, children}: StateProviderProps)=>{
    const [ state, dispatch] = useReducer(reducer, initialState);
    return <StateContext.Provider value={[state, dispatch]}>{children}</StateContext.Provider>
 
};

export const useStateValue = ()=> useContext(StateContext)












