<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include 'config.php';

$user_id = $_GET["id"];

$sql = "SELECT fullname, email, phone, address, city, country
        FROM users WHERE id = $user_id";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();

echo json_encode($user);
