const INITIAL_STATE = {
    cart: []
  };
  
  function cartReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
      case 'ADD_BEER':
        return { ...state, cart: [...state.cart, action.beerToAdd ]};
      default: return state;
    }
  }
  
  export default cartReducer;