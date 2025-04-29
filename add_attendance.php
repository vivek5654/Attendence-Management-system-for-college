<?php
include 'db.php';

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->roll_no) || !isset($data->name) || !isset($data->date) || !isset($data->status)) {
    die(json_encode(["success" => false, "error" => "Missing fields"]));
}

$stmt = $conn->prepare("INSERT INTO attendance (roll_no, name, date, status) VALUES (?, ?, ?, ?)");
$stmt->bind_param("ssss", $data->roll_no, $data->name, $data->date, $data->status);

if ($stmt->execute()) {
    
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "error" => $stmt->error]);
}

$stmt->close();
$conn->close();
?>
