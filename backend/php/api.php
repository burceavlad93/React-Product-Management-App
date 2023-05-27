<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST, DELETE');
header('Access-Control-Allow-Headers: Content-Type');

include './config/database.php';                            // include database
require_once './functions/list_function.php';               // call listing function
require_once './functions/save_function.php';               // call save function
require_once './functions/delete_function.php';             // call delete function

require_once 'classes/Interface/Product_interface.php';     // call product interface
require_once 'classes/Class/DVD_class.php';                 // call dvd class
require_once 'classes/Class/Book_class.php';                // call book class
require_once 'classes/Class/Furniture_class.php';           // call furniture class

switch ($_GET['method']) {                                  // there are 3 methods comming from the frontend, based on that method a certain function is called
    case "list_products":
        listProducts();
        break;
    case "save_products":
        saveProducts();
        break;
    case "delete_products":
        deleteProducts();
        break;
    default:
        exit("There is no case for this method");
}
