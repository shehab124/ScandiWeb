import Product from "./Product";

export default class DVD extends Product {

    constructor(sku, name, price, type, size) {
        super(sku, name, price, type);
        this._size = size; // Using underscore convention for private property
    }

    printAttributes() {
        return "Size: " + this.size + " MB";
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