<?php

require_once "Autoloader.php";

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, DELETE");
    header("Access-Control-Allow-Headers: Content-Type");
    header("HTTP/1.1 200 OK");
    exit;
}

// Regular CORS headers for other requests
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE");
header("Access-Control-Allow-Headers: Content-Type");

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
