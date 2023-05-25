<?php

// Database connection information
define('DB_HOST', 'localhost');
define('DB_USER', 'id20733300_burcea_vlad');
define('DB_PASS', 'ASDqwe123!');
define('DB_NAME', 'id20733300_product');

// Create connection to the database
$conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

// Check the connection
if ($conn->connect_error) {
    die('Connection Failed: ' . $conn->connect_error);
}
