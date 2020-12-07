import { combineReducers } from 'redux';

import cart from './cartReducer';
import { reducer as toastrReducer } from 'react-redux-toastr';

export default combineReducers({
  toastr: toastrReducer,
  cart
});
