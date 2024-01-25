<?php

require_once "Autoloader.php";

class ProductFactory
{
    public function createProduct($product)
    {
        switch ($product->productType) {
            case 'Furniture':
                return $this->createFurniture(
                    $product->sku,
                    $product->name,
                    $product->price,
                    $product->productType,
                    $product->height,
                    $product->width,
                    $product->length
                );
            case 'DVD':
                return $this->createDVD(
                    $product->sku,
                    $product->name,
                    $product->price,
                    $product->productType,
                    $product->size
                );
            case 'Book':
                return $this->createBook(
                    $product->sku,
                    $product->name,
                    $product->price,
                    $product->productType,
                    $product->weight
                );
            default:
                throw new Exception('Invalid product type');
        }
    }

    public function convertProductToArray($product)
    {
        $result = [
            'sku' => $product->getSku(),
            'name' => $product->getName(),
            'price' => $product->getPrice(),
            'productType' => $product->getType(),
        ];

        if ($product instanceof Furniture) {
            $result['height'] = $product->getHeight();
            $result['width'] = $product->getWidth();
            $result['length'] = $product->getLength();
        } elseif ($product instanceof DVD) {
            $result['size'] = $product->getSize();
        } elseif ($product instanceof Book) {
            $result['weight'] = $product->getWeight();
        }

        return $result;
    }

    private function createFurniture($sku, $name, $price, $productType, $height, $width, $length)
    {
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

    private function createDVD($sku, $name, $price, $productType, $size)
    {
        return new DVD(
            $sku,
            $name,
            $price,
            $productType,
            $size
        );
    }

    private function createBook($sku, $name, $price, $productType, $weight)
    {
        return new Book(
            $sku,
            $name,
            $price,
            $productType,
            $weight
        );
    }
}
