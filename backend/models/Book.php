<?php

class Book extends Product
{
    private $_weight;

    public function __construct($sku, $name, $price, $productType, $weight)
    {
        parent::__construct($sku, $name, $price, $productType);
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

        $query = "INSERT INTO products (sku, name, price, productType, weight) VALUES (?, ?, ?, ?, ?)";

        $stmt = $conn->prepare($query);

        $sku = parent::getSku();
        $name = parent::getName();
        $price = parent::getPrice();
        $productType = parent::getType();
        $weight = $this->getWeight();

        $stmt->bind_param(
            'ssdsd',
            $sku,
            $name,
            $price,
            $productType,
            $weight
        );

        $responseData = [];

        try {
            $result = $stmt->execute();
            if ($result) {
                $responseData = [
                    'status' => 'success',
                    'body' => 'Resource added successfully',
                    'http_code' => 200
                ];
            }
        } catch (mysqli_sql_exception) {
            $responseData = [
                'status' => 'failed',
                'body' => "Duplicate SKU",
                'http_code' => 405
            ];
        } catch (Exception) {
            $responseData = [
                'status' => 'failed',
                'body' => "ERROR",
                'http_code' => 404
            ];
        } finally {
            $stmt->close();
            $conn->close();
            return $responseData;
        }
    }

    public function validate()
    {
        $errors = [];
        $errors = parent::validateMainParams();

        $weight = $this->getWeight();

        if ($weight <= 0)
            array_push($errors, "Invalid weight");

        if (count($errors) == 0)
            return true;
        else
            return $errors;
    }
}
