import Product from "./Product";

export default class DVD extends Product {

    constructor(sku, name, price, productType, size) {
        super(sku, name, price, productType);
        this.size = size;
    }

    printAttributes() {
        return "Size: " + this.size + " MB";
    }
}