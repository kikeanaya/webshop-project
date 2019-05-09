import React from 'react';
import { connect } from 'react-redux';

const applyFilter = searchTerm => article =>
  article.name.toLowerCase().includes(searchTerm.toLowerCase()) ||article.brewery.toLowerCase().includes(searchTerm.toLowerCase()) ;

const App = ({ articles, searchTerm, cart, onSearch, addBeer }) =>
  <div className="app">
    <Search searchTerm={searchTerm} onSearch={onSearch}>
    </Search>
    <Cart cart={cart}/>
    <Articles articles={articles.filter(applyFilter(searchTerm))} addBeer={addBeer} />
  </div>

const Cart = ({ cart }) =>
  <div>
    <div className="cart-icon">
      <span className="cart-quantity">{cart.length}</span>
    </div>
    <div className="entire-cart">
      {
        cart.map(beer=>
          <BeerInCart beer={beer} key={beer.id}/>
        )
      }
      <button className="checkout-button">Checkout</button>
    </div>
  </div>

const BeerInCart = ({beer}) =>
    <div className="cart-beer">
      <p>{beer.name}</p>
      <img src={require(`./Images/beer-images/${beer.image}`)} alt={beer.name}/>
    </div>

const Search = ({ searchTerm, onSearch}) =>
  <div className="search-bar">
    <form>
      <input 
      type="search" 
      value={searchTerm}
      onChange={event => onSearch(event.target.value)}/>
    </form>
  </div>

const Articles = ({ articles , addBeer}) =>
  <div className="beer-list">
    {articles.map(article =>
        <Article article={article} addBeer={addBeer} key={article.id}/>
    )}
  </div>

const Article = ({ article, addBeer }) =>
  <div className="beer-card">
    <div className="image-container">
      <img src={require(`./Images/beer-images/${article.image}`)} alt={article.name}/>
    </div>
    <p>{article.name}</p>
    <p>{article.brewery}</p>
    <p>ABV: {article.abv}%</p>
    <p>{article.style}</p>
    <button onClick={() => addBeer(article)}></button>
  </div>

// connecting view layer to state layer with react-redux

const mapStateToProps = state => ({
  articles: state.articlesState.articles,
  searchTerm: state.searchState.searchTerm,
  cart: state.cartState.cart
});

const mapDispatchToProps = dispatch => ({
  onSearch: searchTerm => dispatch({ type: 'SEARCH_SET', searchTerm }),
  addBeer: beerToAdd => dispatch({ type: 'ADD_BEER', beerToAdd })
});

export default connect(mapStateToProps, mapDispatchToProps)(App);