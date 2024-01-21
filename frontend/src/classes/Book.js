import Product from "./Product";

export default class Book extends Product {

    constructor(sku, name, price, type, weight) {
        super(sku, name, price, type);
        this._weight = weight;
    }

    printAttributes() {
        return "Weight: " + this.weight + " KG";
    }

    // Getter for weight
    get weight() {
        return this._weight;
    }

    // Setter for weight
    set weight(newWeight) {
        this._weight = newWeight;
    }
}