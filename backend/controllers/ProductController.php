<?php

require_once "Autoloader.php";

class ProductController
{
    private $productModel;

    public function __construct()
    {
        $this->productModel = new ProductModel();
    }

    public function displayProducts()
    {
        $products = $this->productModel->getProducts();

        header('Content-Type: application/json');

        echo json_encode($products);
    }
}
