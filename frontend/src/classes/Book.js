import Product from "./Product";

export default class Book extends Product {

    constructor(sku, price, type, weight) {
        super(sku, price, type);
        this._weight = weight;
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