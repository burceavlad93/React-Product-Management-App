<?php

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