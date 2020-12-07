import {
  INCREASE_QUANTITY,
  DECREASE_QUANTITY,
  GET_CART_STATE,
  DELETE_ITEM
} from '../actions/types';

const initState = {
  itemsList: [
    {
      id: 9090,
      name: 'Item1',
      price: 200,
      discount: 10,
      type: 'fiction',
      quantity: 1,
      img_url:
        'https://store.lexisnexis.com.au/__data/media/catalog/thumb//placeholder.jpg'
    },
    {
      id: 9091,
      name: 'Item2',
      price: 250,
      discount: 15,
      type: 'literature',
      quantity: 1,
      img_url:
        'https://store.lexisnexis.com.au/__data/media/catalog/thumb//placeholder.jpg'
    },
    {
      id: 9092,
      name: 'Item3',
      price: 320,
      discount: 5,
      type: 'literature',
      quantity: 1,
      img_url:
        'https://store.lexisnexis.com.au/__data/media/catalog/thumb//placeholder.jpg'
    },
    {
      id: 9093,
      name: 'Item4',
      price: 290,
      discount: 0,
      type: 'thriller',
      quantity: 1,
      img_url:
        'https://store.lexisnexis.com.au/__data/media/catalog/thumb//placeholder.jpg'
    },
    {
      id: 9094,
      name: 'Item5',
      price: 500,
      discount: 25,
      type: 'thriller',
      quantity: 1,
      img_url:
        'https://store.lexisnexis.com.au/__data/media/catalog/thumb//placeholder.jpg'
    },
    {
      id: 9095,
      name: 'Item6',
      price: 150,
      discount: 5,
      type: 'literature',
      quantity: 1,
      img_url:
        'https://store.lexisnexis.com.au/__data/media/catalog/thumb//placeholder.jpg'
    },
    {
      id: 9096,
      name: 'Item7',
      price: 700,
      discount: 22,
      type: 'literature',
      quantity: 1,
      img_url:
        'https://store.lexisnexis.com.au/__data/media/catalog/thumb//placeholder.jpg'
    },
    {
      id: 9097,
      name: 'Item8',
      price: 350,
      discount: 18,
      type: 'fiction',
      quantity: 1,
      img_url:
        'https://store.lexisnexis.com.au/__data/media/catalog/thumb//placeholder.jpg'
    }
  ],
  addedItem: [],
  totalItems: [],
  totalPrice: []
};

export default (state = initState, action) => {
  switch (action.type) {
    case INCREASE_QUANTITY:
      if (action.type === INCREASE_QUANTITY) {
        state.addedItem = state.itemsList.find(item => item.id === action.id);
        state.addedItem.quantity++;
        const updatedPrice =
          state.addedItem.price * (state.addedItem.quantity - 1);
        let newTotal = state.totalPrice + updatedPrice;
        return { ...state, totalPrice: newTotal, addedItem: state.addedItem };
      }
      break;
    case DECREASE_QUANTITY:
      if (action.type === DECREASE_QUANTITY) {
        state.addedItem = state.itemsList.find(item => item.id === action.id);
        state.addedItem.quantity--;
        const updatedPrice =
          state.addedItem.price * (state.addedItem.quantity - 1);
        let newTotal = state.totalPrice - updatedPrice;
        return { ...state, totalPrice: newTotal, addedItem: state.addedItem };
      }
      break;
    case GET_CART_STATE:
      if (action.type === GET_CART_STATE) {
        state.itemsList = action.items;
        if (state.itemsList) {
          state.totalItems = state.itemsList
            .map(i => i.quantity)
            .reduce((a, b) => a + b, 0);
          state.totalPrice = state.itemsList
            .map(i => i.price)
            .reduce((a, b) => a + b, 0);
        }

        return {
          ...state,
          itemsList: action.items,
          totalItems: state.totalItems
        };
      }
      break;
    case DELETE_ITEM:
      if (action.type === DELETE_ITEM) {
        let newItems = state.itemsList.filter(item => item.id !== action.id);
        state.totalItems = state.itemsList
          .map(i => i.quantity)
          .reduce((a, b) => a - b, 0);
        return {
          ...state,
          itemsList: newItems,
          totalItems: state.totalItems
        };
      }
      break;
    default:
      return state;
  }
};
