<?php

header("Access-Control-Allow-Origin: *");
//header('Access-Control-Allow-Methods: GET, POST, DELETE');
header('Access-Control-Allow-Headers: Content-Type');

include 'database.php';


function list_products()
{
    global $conn;
    $query = "SELECT * FROM products";
    $stmt = $conn->prepare($query);
    $stmt->execute();
    $result = $stmt->get_result();
    $products = $result->fetch_all(MYSQLI_ASSOC);

    // Debugging statements
    error_log("Fetched products: " . print_r($products, true));

    if (empty($products)) {
        error_log("No products found in the database.");
    }

    $jsonData = json_encode($products);

    // Debugging statement
    error_log("JSON data: " . $jsonData);

    if ($jsonData === false) {
        error_log("JSON encoding failed: " . json_last_error_msg());
    }

    echo $jsonData;
}

function save_products()
{
    global $conn; // Assuming $conn is defined outside the function

    if ($_SERVER["REQUEST_METHOD"] === "GET") {
        exit("method not allowed");
    }

    $data = [
        'sku' => $_POST['sku'],
        'name' => $_POST['name'],
        'price' => $_POST['price'],
        'productType' => $_POST['productType'],
        'size' => $_POST['size'],
        'weight' => $_POST['weight'],
        'height' => $_POST['height'],
        'width' => $_POST['width'],
        'length' => $_POST['length']
    ];

    $data = array_filter($data);
    $productType = $data['productType'];
    $product = new $productType($data);
    $product->saveToDatabase($conn);
    $response = array('message' => 'Form submitted successfully');
    echo json_encode($response);
}


function delete_products()
{
    global $conn;
    $ids = $_POST['data'];

    $placeholders = implode(',', array_fill(0, count($ids), '?'));
    $query = "DELETE FROM products WHERE id IN ($placeholders)";
    $stmt = $conn->prepare($query);
    $stmt->bind_param(str_repeat('i', count($ids)), ...$ids);
    $stmt->execute();

    if ($stmt->affected_rows > 0) {
        echo json_encode(['message' => 'Products deleted successfully']);
    } else {
        echo json_encode(['error' => 'Failed to delete products']);
    }
}


interface Product
{
    public function saveToDatabase($conn);
}

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
                    http_response_code(400); // Duplicate entry response code
                } else {
                    http_response_code(500); // Other database error response code
                }
            }
        } catch (mysqli_sql_exception $e) {
            if ($e->getCode() == 1062) {
                http_response_code(400); // Duplicate entry response code
            } else {
                http_response_code(500); // Other database error response code
            }
        }
    }
}

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
                    http_response_code(400); // Duplicate entry response code
                } else {
                    http_response_code(500); // Other database error response code
                }
            }
        } catch (mysqli_sql_exception $e) {
            if ($e->getCode() == 1062) {
                http_response_code(400); // Duplicate entry response code
            } else {
                http_response_code(500); // Other database error response code
            }
        }
    }
}

class Furniture implements Product
{
    private $sku;
    private $name;
    private $price;
    private $height;
    private $width;
    private $length;

    public function __construct($data)
    {
        $this->sku = $data['sku'];
        $this->name = $data['name'];
        $this->price = $data['price'];
        $this->height = $data['height'];
        $this->width = $data['width'];
        $this->length = $data['length'];
    }


    public function saveToDatabase($conn)
    {
        $query = "INSERT INTO products (sku, name, price, height, width, length) VALUES (?, ?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($query);
        $stmt->bind_param("ssdddd", $this->sku, $this->name, $this->price, $this->height, $this->width, $this->length);  // Correct the parameter name from $his->type to $this->type
        try {
            $stmt->execute();

            if ($stmt->error) {
                if ($stmt->errno == 1062) {
                    http_response_code(400); // Duplicate entry response code
                } else {
                    http_response_code(500); // Other database error response code
                }
            }
        } catch (mysqli_sql_exception $e) {
            if ($e->getCode() == 1062) {
                http_response_code(400); // Duplicate entry response code
            } else {
                http_response_code(500); // Other database error response code
            }
        }
    }
}

if (!isset($_GET['method'])) {
    var_dump(mysqli_error($conn));
    exit("alt exit");
}


switch ($_GET['method']) {
    case "list_products":
        list_products();
        break;
    case "save_products":
        save_products();
        break;
    case "delete_products":
        delete_products();
        break;
    default:
        exit("adio");
}
