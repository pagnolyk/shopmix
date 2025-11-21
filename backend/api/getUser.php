<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include 'config.php'; 

$user_id = $_GET["id"] ?? null;

if (!$user_id || !is_numeric($user_id)) {
    echo json_encode(["success" => false, "error" => "ID invalide ou manquant"]);
    exit;
}

$sql = "SELECT fullname, email, phone, address, city, country FROM users WHERE id = ?";
$stmt = $conn->prepare($sql);

if (!$stmt) {
    echo json_encode(["success" => false, "error" => "Erreur préparation : " . $conn->error]);
    exit;
}

$stmt->bind_param("i", $user_id);
$stmt->execute();

$result = $stmt->get_result();
$user = $result->fetch_assoc();

if ($user) {
    echo json_encode(["success" => true, "data" => $user]);
} else {
    echo json_encode(["success" => false, "error" => "Utilisateur introuvable"]);
}

$stmt->close();
$conn->close();
?>