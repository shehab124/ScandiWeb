import { useState } from "react";
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import Navbar from "../components/NavbarAdd";
import Validations from "../validations/Validations";
import ProductFactory from "../classes/ProductFactory";

export default function AddProduct() {

    const navigate = new useNavigate();

    const form = useForm({
        defaultValues: {
            sku: "",
            name: "",
            price: "",
            productType: "",
            size: "",
            height: "",
            width: "",
            length: "",
            weight: ""
        }
    });

    const [backendErrors, setBackendErrors] = useState(null);
    const { register, handleSubmit, formState, trigger, watch } = form;
    const { errors } = formState;

    const selectProductType = watch('productType');

    const showBookField = selectProductType === 'Book';
    const showFurnitureField = selectProductType === 'Furniture';
    const showDVDField = selectProductType === 'DVD';

    const onSubmit = async (data) => {

        try {
            let factory = new ProductFactory();
            let product = factory.createProduct(data);
            console.log(product)
            console.log("PRODUCT" + JSON.stringify(product))
            const response = await fetch('http://localhost/ScandiWeb/backend/server.php/products', {
                method: 'POST',
                body: JSON.stringify(product),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const json = await response.json();

            console.log(json)
            if (response.ok) {
                navigate('/');
            }
            else {
                setBackendErrors(json.body)
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    const handleNavbarSubmit = () => {
        handleSubmit(onSubmit)();
    }

    return (
        <>
            <Navbar submitHandler={handleNavbarSubmit} selectProductType={selectProductType} />
            <form onSubmit={handleSubmit(onSubmit)} id="product_form" noValidate>

                {/*SKU*/}
                <label className="labels" htmlFor="sku">SKU</label>
                <input
                    className="inputs"
                    type="text"
                    id="sku"
                    {...register("sku", Validations.skuValidation)}
                    onBlur={() => trigger("sku")}
                />
                {errors.sku?.message &&
                    <p className="error">{errors.sku?.message}</p>}

                {/*Name*/}
                <label className="labels" htmlFor="name">Name</label>
                <input
                    className="inputs"
                    type="text"
                    id="name"
                    {...register("name", Validations.nameValidation)}
                    onBlur={() => trigger("name")}
                />
                {errors.name?.message &&
                    <p className="error">{errors.name?.message}</p>}


                {/*Price*/}
                <label className="labels" htmlFor="price">Price($)</label>
                <input
                    className="inputs"
                    type="number"
                    id="price"
                    {...register("price", Validations.priceValidation)}
                    onBlur={() => trigger("price")}
                />
                {errors.price?.message &&
                    <p className="error">{errors.price?.message}</p>}


                {/*Product Type*/}
                <label className="labels" htmlFor="productType">Type Switcher</label>
                <select
                    name="productType"
                    id="productType"
                    className="inputs"
                    {...register("productType", Validations.productTypeValidation)}
                    onBlur={() => trigger("productType")}
                >
                    <option className="inputs" value="">Select a product type</option>
                    <option className="inputs" value="DVD">DVD</option>
                    <option className="inputs" value="Book">Book</option>
                    <option className="inputs" value="Furniture">Furniture</option>
                </select>
                {errors.productType?.message &&
                    <p className="error">{errors.productType?.message}</p>}

                {/*DVD*/}
                {showDVDField &&
                    <div className="dvd">
                        <h3 className="desc">Please, provide size</h3>
                        <label className="labels" htmlFor="size">Size (MB)</label>
                        <input
                            className="inputs"
                            type="number"
                            id="size"
                            {...register("size",
                                Validations.additionalParamsValidation.size)}
                            onBlur={() => trigger(".size")}
                        />
                        {errors?.size?.message && <p className="error">{errors?.size?.message}</p>}
                    </div>
                }

                {/*Furniture*/}
                {showFurnitureField &&
                    <div className="furniture">
                        <h3 className="desc">Please, provide dimensions</h3>
                        <label className="labels" htmlFor="height">Height (CM)</label>
                        <input
                            className="inputs"
                            type="number"
                            id="height"
                            {...register("height",
                                Validations.additionalParamsValidation.height)}
                            onBlur={() => trigger("height")}
                        />
                        {errors?.height?.message &&
                            <p className="error">{errors?.height?.message}</p>}

                        <label className="labels" htmlFor="width">Width (CM)</label>
                        <input
                            className="inputs"
                            type="number"
                            id="width"
                            {...register("width",
                                Validations.additionalParamsValidation.width)}
                            onBlur={() => trigger("width")}
                        />
                        {errors?.width?.message &&
                            <p className="error">{errors?.width?.message}</p>}

                        <label className="labels" htmlFor="length">Length (CM)</label>
                        <input
                            className="inputs"
                            type="number"
                            id="length"
                            {...register("length",
                                Validations.additionalParamsValidation.length)}
                            onBlur={() => trigger("length")}
                        />
                        {errors?.length?.message &&
                            <p className="error">{errors?.length?.message}</p>}
                    </div>
                }

                {showBookField &&
                    <div className="book">
                        <h3 className="desc">Please, provide weight</h3>
                        <label className="labels" htmlFor="weight">Weight (KG)</label>
                        <input
                            className="inputs"
                            type="number"
                            id="weight"
                            {...register("weight",
                                Validations.additionalParamsValidation.weight)}
                            onBlur={() => trigger("weight")}
                        />
                        {errors?.weight?.message &&
                            <p className="error">{errors?.weight?.message}</p>}
                    </div>}
                {backendErrors &&
                    <p className="error">
                        {backendErrors.map((backendError) => {
                            return (<>Server error: {backendError}<br /></>)
                        })}
                    </p>
                }
            </form>
        </>
    )
}
