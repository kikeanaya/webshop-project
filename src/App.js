import React from 'react';
import github from './Images/github.svg'
import linkedin from './Images/linkedin.svg'
import { connect } from 'react-redux';


const applyFilter = searchTerm => article =>
  article.name.toLowerCase().includes(searchTerm.toLowerCase()) ||article.brewery.toLowerCase().includes(searchTerm.toLowerCase()) ;

const App = ({ articles, searchTerm, cart, onSearch, addBeer, removeBeer, cartOpen, openCart, closeCart}) =>
  <div className="app">
    <Search searchTerm={searchTerm} onSearch={onSearch}>
    </Search>
    <Cart cart={cart} removeBeer={removeBeer} openCart={openCart} cartOpen={cartOpen} closeCart={closeCart}/>
    <Articles articles={articles.filter(applyFilter(searchTerm))} addBeer={addBeer} />
    <Footer/>
  </div>

const Cart = ({ cart, removeBeer, openCart, cartOpen, closeCart }) =>

      <div>
          <button className= {(cart.length>0) ? "cart-icon" : "cart-icon-hidden"} onClick= {() => openCart()}>
            <span className="cart-quantity">{cart.length}</span>
          </button>
        <div className={(cartOpen === true) ? "entire-cart cart-open" : "entire-cart"}>
          <button className="close-icon" onClick= {() => closeCart()}></button>
          <h2>YOUR CART:</h2>
          {
            cart.map(beer=>
              <BeerInCart beer={beer} key={beer.id} removeBeer={removeBeer}/>
            )
          }
          <p>You have {cart.length} beers in your cart.</p>
          <button className="checkout-button">CHECKOUT</button>
        </div>
        
      </div>

const BeerInCart = ({beer, removeBeer}) =>
    <div className="cart-beer">
      <img src={require(`./Images/beer-images/${beer.image}`)} alt={beer.name}/>
      <p>{beer.name}</p>
      <button onClick={() => removeBeer(beer)}></button>
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

const Articles = ({ articles , addBeer}) =>{
  if(articles.length >0){
    return <div className="beer-list">
    {articles.map(article =>
        <Article article={article} addBeer={addBeer} key={article.id}/>
    )}
  </div>
  }
  else{
    return <div className="no-results">
      <p>No results found :(</p>
    </div> 
  }
}

const Article = ({ article, addBeer }) =>
  <div className="beer-card">
    <div className="image-container">
      <img src={require(`./Images/beer-images/${article.image}`)} alt={article.name}/>
    </div>
    <h3 className="beer-name">{article.name}</h3>
    <p>{article.brewery}</p>
    <p>ABV: {article.abv}%</p>
    <p>{article.style}</p>
    <button onClick={() => addBeer(article)}></button>
  </div>

const Footer = () =>
  <div className="footer">
    <div className="left-half">
      
    </div>
    <div className="right-half">
      <p>Made by:</p>
      <p>Enrique Anaya Marin</p>
      <p>Located in Madrid, Spain</p>
      <p>luiseanayam@gmail.com</p>
      <p>(+34) 654189233</p>
      <a href="https://www.linkedin.com/in/enrique-anaya-marin/" target="_blank" rel="noopener noreferrer"><img className="contact-logos" src={linkedin} alt="linkedin-logo"/></a>
      <a href="https://github.com/kikeanaya" target="_blank" rel="noopener noreferrer"><img className="contact-logos" src={github} alt="github-logo" /></a>
    </div>
  </div>

const mapStateToProps = state => ({
  articles: state.articlesState.articles,
  searchTerm: state.searchState.searchTerm,
  cart: state.cartState.cart,
  cartOpen: state.cartState.cartOpen
});

const mapDispatchToProps = dispatch => ({
  onSearch: searchTerm => dispatch({ type: 'SEARCH_SET', searchTerm }),
  addBeer: beerToAdd => dispatch({ type: 'ADD_BEER', beerToAdd }),
  removeBeer: beerToRemove => dispatch({ type: 'REMOVE_BEER', beerToRemove }),
  openCart: () => dispatch({ type: 'OPEN_CART' }),
  closeCart: () => dispatch({ type: 'CLOSE_CART' })
});

export default connect(mapStateToProps, mapDispatchToProps)(App);