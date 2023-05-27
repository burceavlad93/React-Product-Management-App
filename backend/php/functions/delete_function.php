<?php

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