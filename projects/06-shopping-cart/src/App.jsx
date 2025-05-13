import { products as initialProducts } from './mocks/products.json'
import { IS_DEVELOPMENT } from './config.js'
import { Products } from "./components/Products/Products"
import { Header } from "./components/Header/Header";
import { useFilter } from "./hooks/useFilter";
import { Footer } from "./components/Footer/Footer";
import { Cart } from './components/Cart/Cart';
import { CartProvider } from './context/cart.jsx';


function App() {
  const { filterProducts } = useFilter();
  const filteredProducts = filterProducts(initialProducts);

  return (
    <>
      <CartProvider>
        <Header />
        <Cart />
        <Products products={filteredProducts} />
        {IS_DEVELOPMENT && <Footer />}
      </CartProvider>
    </>
  )
}

export default App
