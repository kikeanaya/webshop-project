const INITIAL_STATE = {
    cart: [],
    cartOpen: false
  };
  
  function cartReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
      case 'ADD_BEER':
        return { ...state, cart: [...state.cart, action.beerToAdd ]};
      case 'REMOVE_BEER':
        return { ...state, cart: state.cart.filter(beer=>beer.name !== action.beerToRemove.name)};
      case 'OPEN_CART':
        return { ...state, cartOpen: true};
      case 'CLOSE_CART':
        return { ...state, cartOpen: false};
      default: return state;
    }
  }
  
  export default cartReducer;