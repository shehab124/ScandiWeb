import { useState, useEffect } from "react";
import { get, useForm } from 'react-hook-form';
import Navbar from "../components/NavbarAdd";
import ProductFactory from "../classes/ProductFactory";

export default function AddProduct() {

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
    const [IsLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, formState, trigger, watch } = form;
    const { errors, isSubmitSuccessful } = formState;

    const selectProductType = watch('productType');

    const showBookField = selectProductType === 'Book';
    const showFurnitureField = selectProductType === 'Furniture';
    const showDVDField = selectProductType === 'DVD';

    const onSubmit = (data) => {
        console.log("Form submitted", data);
        const productFactory = new ProductFactory();

        try {
            // create product will throw error if product type doesn't exist
            const product = productFactory.createProduct(data.sku, data.price, data.productType, data.additionalParams);

            console.log("Additional Params" + JSON.stringify(data.additionalParams))
            console.log(product) // TODO SEND THIS PRODUCT
            // TODO isLoading
            // TODO check errors first and all data exists
        }
        catch
        {
            // TODO show error message if product type is not set
        }
    }

    const handleNavbarSubmit = () => {
        handleSubmit(onSubmit)();
    }

    const handleValidation = () => {
        console.log("hellllllllllllllllllll")
    }

    return (
        <>
            <Navbar submitHandler={handleNavbarSubmit} selectProductType={selectProductType} />
            <form onSubmit={handleSubmit(onSubmit)} noValidate>

                <div>
                    <label htmlFor="sku">SKU</label>
                    <br />
                    <input
                        type="text"
                        id="sku"
                        {...register("sku", {
                            required: "SKU is required.",
                        })}
                        onBlur={() => trigger("sku")}
                    />
                    <p className="error">{errors.sku?.message}</p>
                </div>

                <br />

                <div>
                    <label htmlFor="name">Name</label>
                    <br />
                    <input
                        type="text"
                        id="name"
                        {...register("name", {
                            required: "Name is required."
                        })}
                        onBlur={() => trigger("name")}
                    />
                    <p className="error">{errors.name?.message}</p>
                </div>


                <br />

                <div>
                    <label htmlFor="price">Price</label>
                    <br />
                    <input
                        type="number"
                        id="price"
                        {...register("price", {
                            valueAsNumber: true,
                            required: "Price is required."
                        })}
                        onBlur={() => trigger("price")}
                    />
                    <p className="error">{errors.price?.message}</p>
                </div>

                <br />

                <div>
                    <label htmlFor="productType">Type Switcher</label>
                    <br />
                    <select name="productType" id="productType" {...register("productType")}>
                        <option value="">Select a product type</option>
                        <option value="DVD">DVD</option>
                        <option value="Book">Book</option>
                        <option value="Furniture">Furniture</option>
                    </select>
                </div>


                <br />
                <br />

                {showDVDField &&
                    <div>
                        <label htmlFor="size">Size (MB)</label>
                        <input
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
                    <div>
                        <label htmlFor="height">Height (CM)</label>
                        <input
                            type="number"
                            id="height"
                            {...register("additionalParams.height", {
                                required: "Height is required"
                            })}
                            onBlur={() => trigger("additionalParams.height")}
                        />
                        <p className="error">{errors?.additionalParams?.height?.message}</p>

                        <label htmlFor="width">Width (CM)</label>
                        <input
                            type="number"
                            id="width"
                            {...register("additionalParams.width", {
                                required: "Width is required"
                            })}
                            onBlur={() => trigger("additionalParams.width")}
                        />
                        <p className="error">{errors?.additionalParams?.width?.message}</p>

                        <label htmlFor="length">Length (CM)</label>
                        <input
                            type="number"
                            id="length"
                            {...register("additionalParams.length", {
                                required: "Length is required"
                            })}
                            onBlur={() => trigger("additionalParams.length")}
                        />
                        <p className="error">{errors?.additionalParams?.length?.message}</p>
                    </div>
                }

                {showBookField &&
                    <div>
                        <label htmlFor="weight">Weight (KG)</label>
                        <input
                            type="number"
                            id="weight"
                            {...register("additionalParams.weight", {
                                required: "Weight is required"
                            })}
                            onBlur={() => trigger("additionalParams.weight")}
                        />
                        <p className="error">{errors.additionalParams?.weight?.message}</p>
                    </div>}
            </form>
        </>
    )
}
