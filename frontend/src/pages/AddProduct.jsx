import { useState } from "react";
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import Navbar from "../components/NavbarAdd";

export default function AddProduct() {

    const navigate = new useNavigate();

    const [backendError, setBackendError] = useState([]);
    const form = useForm({
        defaultValues: {
            sku: "",
            name: "",
            price: "",
            productType: "",
            additionalParams: {
                size: "",
                height: "",
                width: "",
                length: "",
                weight: ""
            }
        }
    });

    const { register, handleSubmit, formState, trigger, watch } = form;
    const { errors, isSubmitSuccessful } = formState;

    const selectProductType = watch('productType');

    const showBookField = selectProductType === 'Book';
    const showFurnitureField = selectProductType === 'Furniture';
    const showDVDField = selectProductType === 'DVD';

    const onSubmit = async (data) => {

        try {
            const response = await fetch('http://localhost/ScandiWeb/backend/server.php/products', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const json = await response.json();

            if (response.ok) {
                navigate('/');
            }
        }
        catch (error) {
            // TODO show error message if product type is not set
            console.log(error.message);
        }
    }

    const handleNavbarSubmit = () => {
        handleSubmit(onSubmit)();
    }

    return (
        <>
            <Navbar submitHandler={handleNavbarSubmit} selectProductType={selectProductType} />
            <form onSubmit={handleSubmit(onSubmit)} validate>

                <label className="labels" htmlFor="sku">SKU</label>
                <input
                    className="inputs"
                    type="text"
                    id="sku"
                    {...register("sku", {
                        required: "SKU is required.",
                        validate: {
                            skuExist: async (fieldValue) => {
                                const response = await fetch(`http://localhost/ScandiWeb/backend/server.php/products/${fieldValue}`)
                                const data = await response.json()
                                console.log(data);
                                return !data || "SKU already exists";
                            }
                        }

                    })}
                    onBlur={() => trigger("sku")}
                />
                {errors.sku?.message &&
                    <p className="error">{errors.sku?.message}</p>}


                <label className="labels" htmlFor="name">Name</label>
                <input
                    className="inputs"
                    type="text"
                    id="name"
                    {...register("name", {
                        required: "Name is required."
                    })}
                    onBlur={() => trigger("name")}
                />
                {errors.name?.message &&
                    <p className="error">{errors.name?.message}</p>}


                <label className="labels" htmlFor="price">Price($)</label>
                <input
                    className="inputs"
                    type="number"
                    id="price"
                    {...register("price", {
                        valueAsNumber: true,
                        required: "Price is required."
                    })}
                    onBlur={() => trigger("price")}
                />
                {errors.price?.message &&
                    <p className="error">{errors.price?.message}</p>}



                <label className="labels" htmlFor="productType">Type Switcher</label>
                <select
                    name="productType"
                    id="productType"
                    className="inputs"
                    {...register("productType", {
                        required: "Type is required"
                    })}
                    onBlur={() => trigger("productType")}
                >
                    <option className="inputs" value="">Select a product type</option>
                    <option className="inputs" value="DVD">DVD</option>
                    <option className="inputs" value="Book">Book</option>
                    <option className="inputs" value="Furniture">Furniture</option>
                </select>
                {errors.productType?.message &&
                    <p className="error">{errors.productType?.message}</p>}


                {showDVDField &&
                    <div className="dvd">
                        <label className="labels" htmlFor="size">Size (MB)</label>
                        <input
                            className="inputs"
                            type="number"
                            id="size"
                            {...register("additionalParams.size", {
                                required: "Size is required"
                            })}
                            onBlur={() => trigger("additionalParams.size")}
                        />
                        {errors?.additionalParams?.size?.message && <p className="error">{errors?.additionalParams?.size?.message}</p>}
                    </div>
                }

                {showFurnitureField &&
                    <div className="furniture">
                        <label className="labels" htmlFor="height">Height (CM)</label>
                        <input
                            className="inputs"
                            type="number"
                            id="height"
                            {...register("additionalParams.height", {
                                required: "Height is required"
                            })}
                            onBlur={() => trigger("additionalParams.height")}
                        />
                        {errors?.additionalParams?.height?.message &&
                            <p className="error">{errors?.additionalParams?.height?.message}</p>}

                        <label className="labels" htmlFor="width">Width (CM)</label>
                        <input
                            className="inputs"
                            type="number"
                            id="width"
                            {...register("additionalParams.width", {
                                required: "Width is required"
                            })}
                            onBlur={() => trigger("additionalParams.width")}
                        />
                        {errors?.additionalParams?.width?.message &&
                            <p className="error">{errors?.additionalParams?.width?.message}</p>}

                        <label className="labels" htmlFor="length">Length (CM)</label>
                        <input
                            className="inputs"
                            type="number"
                            id="length"
                            {...register("additionalParams.length", {
                                required: "Length is required"
                            })}
                            onBlur={() => trigger("additionalParams.length")}
                        />
                        {errors?.additionalParams?.length?.message &&
                            <p className="error">{errors?.additionalParams?.length?.message}</p>}
                    </div>
                }

                {showBookField &&
                    <div className="book">
                        <label className="labels" htmlFor="weight">Weight (KG)</label>
                        <input
                            className="inputs"
                            type="number"
                            id="weight"
                            {...register("additionalParams.weight", {
                                required: "Weight is required"
                            })}
                            onBlur={() => trigger("additionalParams.weight")}
                        />
                        {errors.additionalParams?.weight?.message &&
                            <p className="error">{errors.additionalParams?.weight?.message}</p>}
                    </div>}
            </form>
        </>
    )
}
