<?php

require_once "Autoloader.php";

class Product
{
    private $_sku;
    private $_price;
    private $_type;

    public function __construct($sku, $price, $type)
    {
        $this->_sku = $sku;
        $this->_price = $price;
        $this->_type = $type;
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
        return $this->_type;
    }

    public function setType($type)
    {
        $this->_type = $type;
    }
}
