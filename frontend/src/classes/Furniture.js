import Product from "./Product";

export default class Furniture extends Product {

    constructor(sku, price, type, height, width, length) {
        super(sku, price, type);
        this._height = height;
        this._width = width;
        this._length = length;
    }

    // Getter for height
    get height() {
        return this._height;
    }

    // Setter for height
    set height(newHeight) {
        this._height = newHeight;
    }

    // Getter for width
    get width() {
        return this._width;
    }

    // Setter for width
    set width(newWidth) {
        this._width = newWidth;
    }

    // Getter for length
    get length() {
        return this._length;
    }

    // Setter for length
    set length(newLength) {
        this._length = newLength;
    }
}