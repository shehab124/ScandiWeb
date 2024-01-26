import { useState } from "react"
import Navbar from "../components/NavbarHome"
import useFetch from "../hooks/useFetch"
import ProductFactory from "../classes/ProductFactory";

export default function Products() {

    const { products,
        setProducts,
        isLoading,
        error
    } = useFetch('https://chehabgamal.shop/backend/server.php/products');

    const [selectedSkus, setSelectedSkus] = useState([]);

    let productFactory = new ProductFactory();

    const handleCheckboxChange = (sku) => {
        if (selectedSkus.includes(sku)) {
            setSelectedSkus((prevSelectedSkus) =>
                prevSelectedSkus.filter((selectedSku) => selectedSku !== sku)
            );
        } else {
            setSelectedSkus([...selectedSkus, sku]);
        }
    }

    const handleDelete = async () => {
        try {
            const response = await fetch('https://chehabgamal.shop/backend/server.php/products', {
                method: 'DELETE',
                body: JSON.stringify(selectedSkus),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const json = await response.json();


            if (response.ok) {

                setProducts(products.filter((product) => {
                    return !selectedSkus.includes(product.sku)
                }))
                setSelectedSkus([]);
            }
        }
        catch (error) {
            console.error("Error deleting products:", error);
        }
    }

    return (
        <>
            <Navbar deleteHandler={handleDelete} />
            <div className="products">
                {
                    products.map((product) => {
                        product = productFactory.createProduct(product);
                        return (
                            < div key={product.sku} className="card" >
                                <div className="checkbox-container">
                                    <input
                                        className="delete-checkbox"
                                        type="checkbox"
                                        onChange={() => handleCheckboxChange(product.sku)}
                                    />
                                </div>
                                <div className="attributes">
                                    <h2>{product.sku}</h2>
                                    <h2>{product.name}</h2>
                                    <h4>{product.price}$</h4>
                                    <h4>{product.printAttributes()}</h4>
                                </div>
                            </div>
                        )
                    }
                    )

                }
            </div >
        </>
    )
}