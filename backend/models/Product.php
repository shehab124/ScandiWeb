<?php

require_once "Autoloader.php";

abstract class Product
{
    private $_sku;
    private $_name;
    private $_price;
    private $_productType;

    public function __construct($sku, $name, $price, $productType)
    {
        $this->_sku = $sku;
        $this->_name = $name;
        $this->_price = $price;
        $this->_productType = $productType;
    }

    public function getSku()
    {
        return $this->_sku;
    }

    public function setSku($sku)
    {
        $this->_sku = $sku;
    }

    public function getName()
    {
        return $this->_name;
    }

    public function setName($name)
    {
        $this->_name = $name;
    }

    public function getPrice()
    {
        return $this->_price;
    }

    public function setPrice($price)
    {
        $this->_price = $price;
    }

    public function getType()
    {
        return $this->_productType;
    }

    public function setType($type)
    {
        $this->_productType = $type;
    }

    // returns all products from DB
    public static function getProducts()
    {
        $db = new Database();
        $conn = $db->getConnection();

        $response = [];

        try {
            $query = "SELECT * FROM products";

            $result = $conn->query($query);

            if ($result === false) {
                throw new Exception("Error executing the query");
            }

            $products = $result->fetch_all(MYSQLI_ASSOC);

            $result->free_result();

            // Filter out null values from each product in the array
            $response['data'] = array_map(function ($product) {
                return array_filter($product, function ($value) {
                    return $value !== null;
                });
            }, $products);

            $response['http_code'] = 200;

            return $response;
        } catch (Exception) {
            return [
                'error' => 'Failed to retrieve products.',
                'http_code' => 500
            ];
        } finally {
            $conn->close();
        }
    }

    // receives an array of SKUs and delete them in the DB
    public static function deleteProductsBySku(array $skuArray)
    {
        $db = new Database();
        $conn = $db->getConnection();

        // Sanitize the SKU values (assuming they are strings)
        $sanitizedSkus = array_map(function ($sku) use ($conn) {
            return $conn->real_escape_string($sku);
        }, $skuArray);

        $placeholders = implode(',', array_fill(0, count($sanitizedSkus), '?'));
        $query = "DELETE FROM products WHERE sku IN ($placeholders)";

        $stmt = $conn->prepare($query);

        // Bind parameters
        $types = str_repeat('s', count($sanitizedSkus));
        $stmt->bind_param($types, ...$sanitizedSkus);

        $responseData = [];

        try {
            $result = $stmt->execute();

            if ($result && $stmt->affected_rows > 0) {
                $responseData = [
                    'status' => 'success',
                    'body' => 'Resources deleted successfully',
                    'http_code' => 200
                ];
            } else
                throw new mysqli_sql_exception($stmt->error, $stmt->errno);
        } catch (mysqli_sql_exception $e) {
            $responseData = [
                'status' => 'Failed',
                'body' => 'Failed deleting products',
                'http_code' => 404
            ];
        } finally {
            $stmt->close();
            $conn->close();
        }

        return $responseData;
    }

    // returns true if sku exists
    public static function skuExist($sku)
    {
        $db = new Database();
        $conn = $db->getConnection();

        $response = [];

        try {
            $sanitizedSku = $conn->real_escape_string($sku);

            $query = "SELECT COUNT(*) as count FROM products WHERE sku = ?";

            $stmt = $conn->prepare($query);

            if ($stmt === false) {
                throw new Exception("Error preparing the statement: " . $conn->error);
            }

            $stmt->bind_param('s', $sanitizedSku);

            $stmt->execute();

            $count = 0;

            $stmt->bind_result($count);

            $stmt->fetch();

            $response['data'] = $count > 0;
            $response['http_code'] = 200;

            return $response;
        } catch (Exception) {
            return [
                'error' => 'Error checking SKU existence',
                'http_code' => 500
            ];
        } finally {
            $stmt->close();
            $conn->close();
        }
    }

    // Add a products to the DB
    abstract public function addProduct();

    protected function validateMainParams()
    {
        $sku =         $this->getSku();
        $name =        $this->getName();
        $price =       $this->getPrice();
        $productType = $this->getType();

        $errors = [];

        if ($sku == null || strlen($sku) < 2)
            array_push($errors, "Invalid sku");
        if ($name == null || strlen($name) < 2)
            array_push($errors, "Invalid name");
        if ($price == null || $price < 0)
            array_push($errors, "Invalid price");
        if ($productType == "")
            array_push($errors, "Invalid product type");

        return $errors;
    }

    abstract public function validate();
}
