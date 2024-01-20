import Footer from "./components/Footer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import NotFound from "./pages/404";


function App() {
  return (
    <Router>
      <div className="App">
        <div className="body">
          <Routes>
            <Route exact path="/" element={<Products />} />
            <Route exact path="/add-product" element={<AddProduct />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
