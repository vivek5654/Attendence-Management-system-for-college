<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$host = "localhost";
$username = "root";
$password = "";
$database = "attendence_system";

$conn = new mysqli($host, $username, $password, $database);

if ($conn->connect_error) {
    die(json_encode([
        "success" => false,
        "error" => "Connection failed: " . $conn->connect_error
    ]));
}
?>
