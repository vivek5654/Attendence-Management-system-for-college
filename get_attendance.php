<?php
include 'db.php';

$rollNo = isset($_GET['rollNo']) ? $_GET['rollNo'] : '';
$date = isset($_GET['date']) ? $_GET['date'] : '';

if ($rollNo) {
    if ($date) {
        $stmt = $conn->prepare("SELECT * FROM attendance WHERE roll_no = ? AND date = ?");
        $stmt->bind_param("ss", $rollNo, $date);
    } else {
        $stmt = $conn->prepare("SELECT * FROM attendance WHERE roll_no = ?");
        $stmt->bind_param("s", $rollNo);
    }
} else {
    $stmt = $conn->prepare("SELECT * FROM attendance");
}

$stmt->execute();
$result = $stmt->get_result();
$data = $result->fetch_all(MYSQLI_ASSOC);

echo json_encode($data);
$stmt->close();
$conn->close();
?>
