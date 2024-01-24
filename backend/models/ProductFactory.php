<?php

require_once "Autoloader.php";

class ProductFactory
{
    public function createProduct($sku, $name, $price, $productType, $additionalParams)
    {
        switch ($productType) {
            case 'Furniture':
                return $this->createFurniture(
                    $sku,
                    $name,
                    $price,
                    $productType,
                    $additionalParams
                );
            case 'DVD':
                return $this->createDVD(
                    $sku,
                    $name,
                    $price,
                    $productType,
                    $additionalParams
                );
            case 'Book':
                return $this->createBook(
                    $sku,
                    $name,
                    $price,
                    $productType,
                    $additionalParams
                );
            default:
                throw new Exception('Invalid product type');
        }
    }

    private function createFurniture($sku, $name, $price, $productType, $additionalParams)
    {
        $height = $additionalParams->height;
        $width = $additionalParams->width;
        $length = $additionalParams->length;

        return new Furniture(
            $sku,
            $name,
            $price,
            $productType,
            $height,
            $width,
            $length
        );
    }

    private function createDVD($sku, $name, $price, $productType, $additionalParams)
    {
        $size = $additionalParams->size;

        return new DVD(
            $sku,
            $name,
            $price,
            $productType,
            $size
        );
    }

    private function createBook($sku, $name, $price, $productType, $additionalParams)
    {
        $weight = $additionalParams->weight;

        return new Book(
            $sku,
            $name,
            $price,
            $productType,
            $weight
        );
    }
}
