<?php


class DVD extends Product
{
    private $_size;

    public function __construct($sku, $price, $productType, $size)
    {
        parent::__construct($sku, $price, $productType);
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

        $query = "INSERT INTO products (sku, price, productType, size) VALUES (?, ?, ?, ?)";

        $stmt = $conn->prepare($query);

        $sku = parent::getSku();
        $price = parent::getPrice();
        $productType = parent::getType();
        $size = $this->getSize();

        $stmt->bind_param(
            'sdsd', // TODO: TYPES string, double
            $sku,
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
            //http_response_code(405);
            $responseData = [
                'status' => 'failed',
                'body' => "ERROR",
                'http_code' => 404
            ];
        }

        $stmt->close();
        $conn->close();

        return $responseData;
    }
}
