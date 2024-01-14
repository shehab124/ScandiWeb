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
}
