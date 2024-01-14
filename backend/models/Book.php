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
}
