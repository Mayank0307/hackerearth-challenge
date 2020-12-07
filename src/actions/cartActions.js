import {
  INCREASE_QUANTITY,
  DECREASE_QUANTITY,
  GET_CART_STATE,
  DELETE_ITEM
} from './types';

export const addQuantity = id => {
  return {
    type: INCREASE_QUANTITY,
    id
  };
};

export const subtractQuantity = id => {
  return {
    type: DECREASE_QUANTITY,
    id
  };
};

export const deleteItemFromCart = id => {
  return {
    type: DELETE_ITEM,
    id
  };
};

export const getCartState = () => {
  const items = JSON.parse(localStorage.getItem('items'));
  return {
    type: GET_CART_STATE,
    items
  };
};
