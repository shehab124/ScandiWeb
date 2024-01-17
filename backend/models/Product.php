<?php

require_once "Autoloader.php";

abstract class Product
{
    private $_sku;
    private $_price;
    private $_productType;

    public function __construct($sku, $price, $productType)
    {
        $this->_sku = $sku;
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

    public static function getProducts()
    {
        $db = new Database();

        $conn = $db->getConnection();

        $query = "SELECT * FROM products";

        $result = $conn->query($query);

        if (!$result) {
            return json_encode([]);
        }

        $products = $result->fetch_all(MYSQLI_ASSOC);

        $result->free_result();

        // Filter out null values from each product in the array
        $filteredProducts = array_map(function ($product) {
            return array_filter($product, function ($value) {
                return $value !== null;
            });
        }, $products);

        return $filteredProducts;
    }

    public static function deleteProductsBySku(array $skuArray)
    {
        $db = new Database();
        $conn = $db->getConnection();

        // Sanitize the SKU values (assuming they are strings)
        $sanitizedSkus = array_map(function ($sku) use ($conn) {
            return $conn->real_escape_string($sku);
        }, $skuArray);

        // Prepare the DELETE query with an IN clause
        $placeholders = implode(',', array_fill(0, count($sanitizedSkus), '?'));
        $query = "DELETE FROM products WHERE sku IN ($placeholders)";

        // Create a prepared statement
        $stmt = $conn->prepare($query);

        // Bind parameters
        $types = str_repeat('s', count($sanitizedSkus));
        $stmt->bind_param($types, ...$sanitizedSkus);

        $result = $stmt->execute();

        if ($result) {
            echo "Products deleted successfully!";
        } else {
            echo "Error: " . $stmt->error;
        }

        $stmt->close();
        $conn->close();
    }

    // returns true if sku exists
    public static function skuExist($sku)
    {
        $db = new Database();

        $conn = $db->getConnection();

        $sanitizedSku = $conn->real_escape_string($sku);

        $query = "SELECT COUNT(*) as count FROM products WHERE sku = ?";

        $stmt = $conn->prepare($query);

        $stmt->bind_param('s', $sanitizedSku);

        $stmt->execute();

        $count = 0;

        $stmt->bind_result($count);

        $stmt->fetch();

        $stmt->close();
        $conn->close();

        return $count > 0;
    }

    abstract public function addProduct();
}
