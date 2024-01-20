import { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import Navbar from "../components/NavbarAdd";

export default function AddProduct() {

    const [IsLoading, setIsLoading] = useState(false);
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

        console.log(data)
        setIsLoading(true);
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
                console.log("Product CREATED!")
            }

            // TODO isLoading
            // TODO check errors first and all data exists
        }
        catch (error) {
            // TODO show error message if product type is not set
            console.log(error.message);
        }
        finally {
            setIsLoading(false);
        }
    }

    const handleNavbarSubmit = () => {
        handleSubmit(onSubmit)();
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
