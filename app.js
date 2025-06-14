const App = () => {
    const [shirts, setShirts] = React.useState(tshirts);
  
    const handleBuy = (title, quantity) => {
      const newShirts = shirts.map(shirt => {
        if (shirt.title === title) {
          return { ...shirt, stock: shirt.stock - quantity };
        }
        return shirt;
      });
      setShirts(newShirts);
    };
  
    return (
      <div>
        <h1>T-Shirts Storefront</h1>
        <div className="t-shirt-container">
          {shirts.map(shirt => (
            <TShirt key={shirt.title} shirt={shirt} onBuy={handleBuy} />
          ))}
        </div>
      </div>
    );
  };
  
  const TShirt = ({ shirt, onBuy }) => {
    const [quantity, setQuantity] = React.useState(1);
  
    const handleQuantityChange = (event) => {
      setQuantity(parseInt(event.target.value, 10));
    };
  
    const handleBuyClick = () => {
      onBuy(shirt.title, quantity);
      setQuantity(1); // Reset quantity after a successful purchase
    };
  
    return (
      <div className="t-shirt-item">
        <h2>{shirt.title}</h2>
        <img src={shirt.image} alt={shirt.title} width="200" />
        <p>Price: ${shirt.price.toFixed(2)}</p>
        {shirt.stock > 0 ? (
          <p>Stock: {shirt.stock}</p>
        ) : (
          <p className="out-of-stock">Out of Stock</p>
        )}
        {shirt.stock > 0 && (
          <div className="buy-controls">
            <select value={quantity} onChange={handleQuantityChange}>
              {[...Array(shirt.stock).keys()].map(x => (
                <option key={x + 1} value={x + 1}>
                  {x + 1}
                </option>
              ))}
            </select>
            <button onClick={handleBuyClick}>Buy</button>
          </div>
        )}
      </div>
    );
  };
  
  ReactDOM.render(<App />, document.getElementById('root'));