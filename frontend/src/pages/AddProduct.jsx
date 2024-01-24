import { useState } from "react";
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import Navbar from "../components/NavbarAdd";
import Validations from "../validations/Validations";

export default function AddProduct() {

    const navigate = new useNavigate();

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

    const [backendErrors, setBackendErrors] = useState(null);
    const { register, handleSubmit, formState, trigger, watch } = form;
    const { errors } = formState;

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
            <form onSubmit={handleSubmit(onSubmit)} noValidate>

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
                        <label className="labels" htmlFor="size">Size (MB)</label>
                        <input
                            className="inputs"
                            type="number"
                            id="size"
                            {...register("additionalParams.size",
                                Validations.additionalParamsValidation.size)}
                            onBlur={() => trigger("additionalParams.size")}
                        />
                        {errors?.additionalParams?.size?.message && <p className="error">{errors?.additionalParams?.size?.message}</p>}
                    </div>
                }

                {/*Furniture*/}
                {showFurnitureField &&
                    <div className="furniture">
                        <label className="labels" htmlFor="height">Height (CM)</label>
                        <input
                            className="inputs"
                            type="number"
                            id="height"
                            {...register("additionalParams.height",
                                Validations.additionalParamsValidation.height)}
                            onBlur={() => trigger("additionalParams.height")}
                        />
                        {errors?.additionalParams?.height?.message &&
                            <p className="error">{errors?.additionalParams?.height?.message}</p>}

                        <label className="labels" htmlFor="width">Width (CM)</label>
                        <input
                            className="inputs"
                            type="number"
                            id="width"
                            {...register("additionalParams.width",
                                Validations.additionalParamsValidation.width)}
                            onBlur={() => trigger("additionalParams.width")}
                        />
                        {errors?.additionalParams?.width?.message &&
                            <p className="error">{errors?.additionalParams?.width?.message}</p>}

                        <label className="labels" htmlFor="length">Length (CM)</label>
                        <input
                            className="inputs"
                            type="number"
                            id="length"
                            {...register("additionalParams.length",
                                Validations.additionalParamsValidation.length)}
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
                            {...register("additionalParams.weight",
                                Validations.additionalParamsValidation.weight)}
                            onBlur={() => trigger("additionalParams.weight")}
                        />
                        {errors.additionalParams?.weight?.message &&
                            <p className="error">{errors.additionalParams?.weight?.message}</p>}
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
