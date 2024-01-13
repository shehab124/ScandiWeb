import Footer from "./components/Footer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Products />} />
          <Route exact path="/add-product" element={<AddProduct />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
