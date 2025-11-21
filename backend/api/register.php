<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");

include 'config.php'; // $conn = new mysqli(...)

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode(["success" => false, "message" => "Aucune donnée reçue"]);
    exit;
}

$nom      = trim($data["nom"] ?? "");
$prenom   = trim($data["prenom"] ?? "");
$numero   = trim($data["numero"] ?? "");
$username = trim($data["username"] ?? "");
$password = trim($data["password"] ?? "");

if (!$nom || !$prenom || !$numero || !$username || !$password) {
    echo json_encode(["success" => false, "message" => "Tous les champs sont requis"]);
    exit;
}

$checkSql = "SELECT id FROM users WHERE username = ? OR numero = ?";
$checkStmt = $conn->prepare($checkSql);
$checkStmt->bind_param("ss", $username, $numero);
$checkStmt->execute();
$checkStmt->store_result();

if ($checkStmt->num_rows > 0) {
    echo json_encode(["success" => false, "message" => "Nom d'utilisateur ou numéro déjà utilisé"]);
    $checkStmt->close();
    exit;
}
$checkStmt->close();

$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

$insertSql = "INSERT INTO users (nom, prenom, numero, username, password) VALUES (?, ?, ?, ?, ?)";
$insertStmt = $conn->prepare($insertSql);
$insertStmt->bind_param("sssss", $nom, $prenom, $numero, $username, $hashedPassword);

if ($insertStmt->execute()) {
    echo json_encode(["success" => true, "message" => "Inscription réussie !"]);
} else {
    echo json_encode(["success" => false, "message" => "Erreur lors de l'inscription : " . $insertStmt->error]);
}

$insertStmt->close();
$conn->close();
?>