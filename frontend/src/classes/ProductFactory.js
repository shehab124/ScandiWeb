import DVD from "./DVD";
import Book from "./Book";
import Furniture from "./Furniture";

export default class ProductFactory {
    createProduct(sku, price, type, additionalParams) {
        switch (type) {
            case 'Furniture':
                return this.createFurniture(sku, price, type, additionalParams);
            case 'DVD':
                return this.createDVD(sku, price, type, additionalParams);
            case 'Book':
                return this.createBook(sku, price, type, additionalParams);
            default:
                throw new Error('Invalid product type');
        }
    }

    createFurniture(sku, price, type, { height, width, length }) {
        return new Furniture(sku, price, type, height, width, length);
    }

    createDVD(sku, price, type, { size }) {
        return new DVD(sku, price, type, size);
    }

    createBook(sku, price, type, { weight }) {
        return new Book(sku, price, type, weight);
    }
}