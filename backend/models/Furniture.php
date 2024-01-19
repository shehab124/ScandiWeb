<?php


class Furniture extends Product
{
    private $_height;
    private $_width;
    private $_length;

    public function __construct($sku, $price, $productType, $height, $width, $length)
    {
        parent::__construct($sku, $price, $productType);
        $this->_height = $height;
        $this->_width = $width;
        $this->_length = $length;
    }

    public function getHeight()
    {
        return $this->_height;
    }

    public function setHeight($newHeight)
    {
        $this->_height = $newHeight;
    }

    public function getWidth()
    {
        return $this->_width;
    }

    public function setWidth($newWidth)
    {
        $this->_width = $newWidth;
    }

    public function getLength()
    {
        return $this->_length;
    }

    public function setLength($newLength)
    {
        $this->_length = $newLength;
    }

    public function addProduct()
    {
        $db = new Database();

        $conn = $db->getConnection();

        $query = "INSERT INTO products (sku, price, productType, height, width, length) VALUES (?, ?, ?, ?, ?, ?)";

        $sku = parent::getSku();
        $price = parent::getPrice();
        $productType = parent::getType();
        $height = $this->getHeight();
        $width = $this->getWidth();
        $length = $this->getLength();

        $stmt = $conn->prepare($query);
        $stmt->bind_param(
            'sdsddd',
            $sku,
            $price,
            $productType,
            $height,
            $width,
            $length
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
        }

        $stmt->close();
        $conn->close();

        return $responseData;
    }
}
