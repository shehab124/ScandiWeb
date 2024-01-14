<?php

require_once "Autoloader.php";

class ProductFactory
{
    public function createProduct($sku, $price, $type, $additionalParams)
    {
        switch ($type) {
            case 'Furniture':
                return $this->createFurniture($sku, $price, $type, $additionalParams);
            case 'DVD':
                return $this->createDVD($sku, $price, $type, $additionalParams);
            case 'Book':
                return $this->createBook($sku, $price, $type, $additionalParams);
            default:
                throw new Exception('Invalid product type');
        }
    }

    private function createFurniture($sku, $price, $type, $additionalParams)
    {
        $height = $additionalParams['height'];
        $width = $additionalParams['width'];
        $length = $additionalParams['length'];

        return new Furniture($sku, $price, $type, $height,  $width, $length);
    }

    private function createDVD($sku, $price, $type, $additionalParams)
    {
        $size = $additionalParams['size'];

        return new DVD($sku, $price, $type, $size);
    }

    private function createBook($sku, $price, $type, $additionalParams)
    {
        $weight = $additionalParams['weight'];

        return new Book($sku, $price, $type, $weight);
    }
}
