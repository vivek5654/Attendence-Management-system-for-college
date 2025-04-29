<?php
include 'db.php';

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->id)) {
    die(json_encode(["success" => false, "error" => "Missing ID"]));
}

$stmt = $conn->prepare("DELETE FROM attendance WHERE id = ?");
$stmt->bind_param("i", $data->id);

if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "error" => $stmt->error]);
}

$stmt->close();
$conn->close();
?>