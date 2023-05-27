<?php

class DVD implements Product
{

    private $sku;
    private $name;
    private $price;
    private $size;

    public function __construct($data)
    {
        $this->sku = $data['sku'];
        $this->name = $data['name'];
        $this->price = $data['price'];
        $this->size = $data['size'];
    }

    public function saveToDatabase($conn)
    {
        $query = "INSERT INTO products (sku, name, price, size) VALUES (?, ?, ?, ?)";
        $stmt = $conn->prepare($query);
        $stmt->bind_param("ssdi", $this->sku, $this->name, $this->price, $this->size);
        try {
            $stmt->execute();

            if ($stmt->error) {
                if ($stmt->errno == 1062) {
                    http_response_code(400); // duplicate entry response code
                } else {
                    http_response_code(500); // other database error response code
                }
            }
        } catch (mysqli_sql_exception $e) {
            if ($e->getCode() == 1062) {
                http_response_code(400); // duplicate entry response code
            } else {
                http_response_code(500); // other database error response code
            }
        }
    }
}
