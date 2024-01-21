import DVD from "./DVD";
import Book from "./Book";
import Furniture from "./Furniture";

export default class ProductFactory {
    createProduct(product) {
        console.log(product)
        switch (product.productType) {
            case 'Furniture':
                return this.createFurniture(product.sku, product.name, product.price, product.productType, product.height, product.width, product.length);
            case 'DVD':
                return this.createDVD(product.sku, product.name, product.price, product.productType, product.size);
            case 'Book':
                return this.createBook(product.sku, product.name, product.price, product.productType, product.weight);
            default:
                throw new Error('Invalid product type');
        }
    }

    createFurniture(sku, name, price, productType, height, width, length) {
        return new Furniture(sku, name, price, productType, height, width, length);
    }

    createDVD(sku, name, price, productType, size) {
        return new DVD(sku, name, price, productType, size);
    }

    createBook(sku, name, price, productType, weight) {
        return new Book(sku, name, price, productType, weight);
    }
}