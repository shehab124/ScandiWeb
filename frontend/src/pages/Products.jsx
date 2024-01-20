import { useState, useEffect } from "react"
import Navbar from "../components/NavbarHome"
import useFetch from "../hooks/useFetch"

export default function Products() {

    const { data: products, setData: setProducts, isLoading, error } = useFetch('http://localhost/ScandiWeb/backend/server.php/products');

    const [selectedSkus, setSelectedSkus] = useState([]);

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
            const response = await fetch('http://localhost/ScandiWeb/backend/server.php/products', {
                method: 'DELETE',
                body: JSON.stringify(selectedSkus),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const json = await response.json();

            console.log(json);

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

    useEffect(() => {
        console.log(products)
        console.log("Selected Skus:", selectedSkus);
    }, [selectedSkus, setSelectedSkus]);


    return (
        <>
            <Navbar deleteHandler={handleDelete} />
            <div className="products">
                {
                    products.map((product) =>
                        <div key={product.sku} className="card">
                            <div className="checkbox">
                                <input
                                    type="checkbox"
                                    onChange={() => handleCheckboxChange(product.sku)} />
                            </div>
                            <div className="attributes">
                                <h2>{product.name}</h2>
                                <h4>{product.sku}</h4>
                            </div>
                        </div>
                    )

                }
            </div>
        </>
    )
}