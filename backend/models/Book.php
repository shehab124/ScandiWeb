<?php

class Book extends Product
{
    private $_weight;

    public function __construct($sku, $price, $productType, $weight)
    {
        parent::__construct($sku, $price, $productType);
        $this->_weight = $weight;
    }

    public function getWeight()
    {
        return $this->_weight;
    }

    public function setWeight($newWeight)
    {
        $this->_weight = $newWeight;
    }

    public function addProduct()
    {
        $db = new Database();

        $conn = $db->getConnection();

        $query = "INSERT INTO products (sku, price, productType, weight) VALUES (?, ?, ?, ?)";

        $stmt = $conn->prepare($query);

        $sku = parent::getSku();
        $price = parent::getPrice();
        $productType = parent::getType();
        $weight = $this->getWeight();

        $stmt->bind_param(
            'sdsd', // TODO: TYPES string, double
            $sku,
            $price,
            $productType,
            $weight
        );

        $result = $stmt->execute();

        if ($result) {
            echo "Product inserted successfully!";
        } else {
            echo "Error: " . $stmt->error;
        }

        $stmt->close();
        $conn->close();
    }
}
