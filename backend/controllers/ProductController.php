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

        $newProduct = $factory->createProduct($product);
        $validation = $newProduct->validate();

        if ($validation === true) {
            $responseData = $newProduct->addProduct();
        } else {
            $responseData = [
                'status' => 'failed',
                'body' => $validation,
                'http_code' => 404
            ];
        }
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
