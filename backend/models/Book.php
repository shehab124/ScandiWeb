<?php

class Book extends Product
{
    private $_weight;

    public function __construct($sku, $price, $type, $weight)
    {
        parent::__construct($sku, $price, $type);
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

        $query = "INSERT INTO products (sku, price, type, weight) VALUES (?, ?, ?, ?)";

        $stmt = $conn->prepare($query);

        $sku = parent::getSku();
        $price = parent::getPrice();
        $type = parent::getType();
        $weight = $this->getWeight();

        $stmt->bind_param(
            'sdsd', // TODO: TYPES string, double
            $sku,
            $price,
            $type,
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
