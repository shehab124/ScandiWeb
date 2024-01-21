export default class Product {
    constructor(sku, name, price, type) {
        this._sku = sku;
        this._name = name;
        this._price = price;
        this._type = type;
    }

    // Getter for SKU
    get sku() {
        return this._sku;
    }

    // Setter for SKU
    set sku(newSku) {
        this._sku = newSku;
    }

    // Getter for price
    get price() {
        return this._price;
    }

    // Setter for price
    set price(newPrice) {
        this._price = newPrice;
    }

    // Getter for type
    get type() {
        return this._type;
    }

    // Setter for type
    set type(newType) {
        this._type = newType;
    }

    get name() {
        return this._name;
    }

    set name(name) {
        this._name = name;
    }
}