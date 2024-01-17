<?php

require_once "Autoloader.php";

$requestPath = isset($_SERVER['PATH_INFO']) ? $_SERVER['PATH_INFO'] : '/';

$requestMethod = $_SERVER['REQUEST_METHOD'];

$pathSegments = explode('/', trim($requestPath, '/'));


switch ($pathSegments[0]) {
    case 'products':
        $productController = new ProductController();

        if ($requestMethod === 'GET') {

            $sku = isset($pathSegments[1]) ? $pathSegments[1] : null;

            if ($sku) {
                $productController->checkSku($sku);
            } else
                $productController->displayProducts();
        } elseif ($requestMethod === 'POST') {
            $requestData = json_decode(file_get_contents('php://input'), false);
            $productController->addProduct($requestData);
        } else if ($requestMethod === 'DELETE') {
            $requestData = json_decode(file_get_contents('php://input'), false);
            $productController->deleteProducts($requestData);
        } else {
            http_response_code(405);
            echo 'Method Not Allowed';
        }
        break;

    default:
        // Handle 404 or other fallback logic
        http_response_code(404);
        echo 'Not Found';
        break;
}
