<?php

require_once "Autoloader.php";

class ProductFactory
{
    public function createProduct($sku, $price, $productType, $additionalParams)
    {
        switch ($productType) {
            case 'Furniture':
                return $this->createFurniture($sku, $price, $productType, $additionalParams);
            case 'DVD':
                return $this->createDVD($sku, $price, $productType, $additionalParams);
            case 'Book':
                return $this->createBook($sku, $price, $productType, $additionalParams);
            default:
                throw new Exception('Invalid product type');
        }
    }

    private function createFurniture($sku, $price, $productType, $additionalParams)
    {
        $height = $additionalParams->height;
        $width = $additionalParams->width;
        $length = $additionalParams->length;

        return new Furniture($sku, $price, $productType, $height,  $width, $length);
    }

    private function createDVD($sku, $price, $productType, $additionalParams)
    {
        $size = $additionalParams->size;

        return new DVD($sku, $price, $productType, $size);
    }

    private function createBook($sku, $price, $productType, $additionalParams)
    {
        $weight = $additionalParams->weight;

        return new Book($sku, $price, $productType, $weight);
    }
}
