<?php


class DVD extends Product
{
    private $_size;

    public function __construct($sku, $price, $type, $size)
    {
        parent::__construct($sku, $price, $type);
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

        $query = "INSERT INTO products (sku, price, type, size) VALUES (?, ?, ?, ?)";

        $stmt = $conn->prepare($query);

        $sku = parent::getSku();
        $price = parent::getPrice();
        $type = parent::getType();
        $size = $this->getSize();

        $stmt->bind_param(
            'sdsd', // TODO: TYPES string, double
            $sku,
            $price,
            $type,
            $size
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
