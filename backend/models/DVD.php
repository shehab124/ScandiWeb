<?php


class DVD extends Product
{
    private $_size;

    public function __construct($sku, $name, $price, $productType, $size)
    {
        parent::__construct($sku, $name, $price, $productType);
        $this->_size = $size;
    }

    public function getSize()
    {
        return $this->_size;
    }

    public function setSize($newSize)
    {
        $this->_size = $newSize;
    }

    public function addProduct()
    {
        $db = new Database();

        $conn = $db->getConnection();

        $query = "INSERT INTO products (sku, name, price, productType, size) VALUES (?, ?, ?, ?, ?)";

        $stmt = $conn->prepare($query);

        $sku = parent::getSku();
        $name = parent::getName();
        $price = parent::getPrice();
        $productType = parent::getType();
        $size = $this->getSize();

        $stmt->bind_param(
            'ssdsd',
            $sku,
            $name,
            $price,
            $productType,
            $size
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

        $size = $this->getSize();

        if ($size < 0)
            array_push($errors, "Invalid size");

        if (count($errors) == 0)
            return true;
        else
            return $errors;
    }
}
