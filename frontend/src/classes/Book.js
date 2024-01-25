import Product from "./Product";

export default class Book extends Product {

    constructor(sku, name, price, productType, weight) {
        super(sku, name, price, productType);
        this.weight = weight;
    }

    printAttributes() {
        return "Weight: " + this.weight + " KG";
    }
}