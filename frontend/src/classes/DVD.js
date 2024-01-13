import Product from "./Product";

export default class DVD extends Product {

    constructor(sku, price, type, size) {
        super(sku, price, type);
        this._size = size; // Using underscore convention for private property
    }

    // Getter for size
    get size() {
        return this._size;
    }

    // Setter for size
    set size(newSize) {
        this._size = newSize;
    }
}