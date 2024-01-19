<?php

require_once "Autoloader.php";

class ProductController
{
    public function __construct()
    {
    }

    public function displayProducts()
    {
        $response = Product::getProducts();

        header('Content-Type: application/json');
        http_response_code($response['http_code']);
        echo json_encode($response['data']);
    }

    public function addProduct($product)
    {
        $factory = new ProductFactory();

        $newProduct = $factory->createProduct(
            $product->sku,
            $product->price,
            $product->productType,
            $product->additionalParams
        );
        $responseData = $newProduct->addProduct();

        header('Content-Type: application/json');
        http_response_code($responseData['http_code']);
        echo json_encode($responseData);
    }

    public function deleteProducts(array $products)
    {
        $responseData = Product::deleteProductsBySku($products);

        header('Content-Type: application/json');
        http_response_code($responseData['http_code']);
        echo json_encode($responseData);
    }

    public function checkSku($sku)
    {
        header('Content-Type: application/json');

        $response = Product::skuExist($sku);
        http_response_code($response['http_code']);

        echo json_encode($response['data']);
    }
}
