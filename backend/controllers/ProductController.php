<?php

require_once "Autoloader.php";

class ProductController
{
    private $productModel;

    public function __construct()
    {
    }

    public function displayProducts()
    {
        $products = Product::getProducts();

        header('Content-Type: application/json');

        echo json_encode($products);
    }

    public function addProduct($product)
    {
        $factory = new ProductFactory();

        $newProduct = $factory->createProduct($product->sku, $product->price, $product->type, $product->additionalParams);
        $newProduct->addProduct();
    }

    public function deleteProducts(array $products)
    {
        Product::deleteProductsBySku($products);
    }
}
