import Product from "./Product";

export default class Furniture extends Product {

    constructor(sku, name, price, productType, height, width, length) {
        super(sku, name, price, productType);
        this.height = height;
        this.width = width;
        this.length = length;
    }

    printAttributes() {
        return "Dimensions: " + this.length + "x" + this.width + "x" + this.height;
    }
}