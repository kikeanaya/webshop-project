import { combineReducers } from 'redux';

import articleReducer from './articleReducer';
import searchReducer from './searchReducer';
import cartReducer from './cartReducer';


const rootReducer = combineReducers({
  articlesState: articleReducer,
  searchState: searchReducer,
  cartState: cartReducer
});

export default rootReducer;