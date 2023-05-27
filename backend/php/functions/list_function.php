<?php

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
