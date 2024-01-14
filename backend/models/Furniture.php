<?php


class Furniture extends Product
{
    private $_height;
    private $_width;
    private $_length;

    public function __construct($sku, $price, $type, $height, $width, $length)
    {
        parent::__construct($sku, $price, $type);
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
}
