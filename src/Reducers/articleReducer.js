const beer = require('../beers.json')


const INITIAL_STATE = {
    articles: beer
  };
  
  function articleReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
      default: return state;
    }
  }
  
  export default articleReducer;  