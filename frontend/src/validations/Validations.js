class Validations {

    static skuValidation = {
        required: "SKU is required.",
        minLength: {
            value: 2,
            message: "SKU length must be greater than or equal 2."
        },
        validate: {
            skuExist: async (fieldValue) => {
                const response = await fetch(`http://localhost/ScandiWeb/backend/server.php/products/${fieldValue}`)
                const data = await response.json()
                return !data || "SKU already exists";
            }
        }
    };

    static nameValidation = {
        required: "Name is required.",
        minLength: {
            value: 2,
            message: "Name length must be greater than or equal 2."
        }
    }

    static priceValidation = {
        valueAsNumber: true,
        required: "Price is required.",
        min: {
            value: 0.01,
            message: "Price must be greater than 0"
        }
    };

    static productTypeValidation = {
        required: "Type is required",
    };

    static additionalParamsValidation = {
        size: {
            required: "Size is required",
            valueAsNumber: true,
            min: {
                value: 0.01,
                message: "Size must be greater than 0"
            }
        },
        height: {
            required: "Height is required",
            valueAsNumber: true,
            min: {
                value: 0.01,
                message: "Height must be greater than 0"
            }
        },
        width: {
            required: "Width is required",
            valueAsNumber: true,
            min: {
                value: 0.01,
                message: "Width must be greater than 0"
            }
        },
        length: {
            required: "Length is required",
            valueAsNumber: true,
            min: {
                value: 0.01,
                message: "Length must be greater than 0"
            }
        },
        weight: {
            required: "Weight is required",
            valueAsNumber: true,
            min: {
                value: 0.01,
                message: "Weight must be greater than 0"
            }
        },

    }
}


export default Validations;