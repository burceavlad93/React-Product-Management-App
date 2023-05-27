<?php

class Book implements Product
{
    private $sku;
    private $name;
    private $price;
    private $weight;

    public function __construct($data)
    {
        $this->sku = $data['sku'];
        $this->name = $data['name'];
        $this->price = $data['price'];
        $this->weight = $data['weight'];
    }

    public function saveToDatabase($conn)
    {
        $query = "INSERT INTO products (sku, name, price, weight) VALUES (?, ?, ?, ?)";
        $stmt = $conn->prepare($query);
        $stmt->bind_param("ssdd", $this->sku, $this->name, $this->price, $this->weight);
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
