import Navbar from "../components/NavbarHome"
import useFetch from "../hooks/useFetch"
import ProductFactory from "../classes/ProductFactory";

export default function Products() {

    const { products, setProducts, isLoading, error }
        = useFetch('https://chehabgamal.shop/backend/server.php/products');


    let productFactory = new ProductFactory();

    const handleDelete = async () => {

        let checkboxs = document.getElementsByClassName('delete-checkbox');
        let selectedSkus = [];

        for (let i = 0; i < checkboxs.length; i++) {
            if (checkboxs[i].checked)
                selectedSkus.push(checkboxs[i].value);
        }

        try {
            const response = await fetch('https://chehabgamal.shop/backend/server.php/products', {
                method: 'DELETE',
                body: JSON.stringify(selectedSkus),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (response.ok) {

                setProducts(products.filter((product) => {
                    return !selectedSkus.includes(product.sku)
                }))
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
                                        value={product.sku}
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
            {isLoading && !products.length === 0 && !error
                && <p className="banner">Loading...</p>}
            {error && !isLoading && !products.length === 0
                && <p className="banner">Error fetching data</p>}
            {products.length === 0 && !error && !isLoading
                && <p className="banner">No products available</p>}
        </>
    )
}