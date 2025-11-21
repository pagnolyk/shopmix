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

$username = trim($data["username"] ?? "");
$password = trim($data["password"] ?? "");

if (!$username || !$password) {
    echo json_encode(["success" => false, "message" => "Tous les champs sont requis"]);
    exit;
}

$sql = "SELECT id, username, nom, prenom, numero, password FROM users WHERE username = ?";
$stmt = $conn->prepare($sql);

if (!$stmt) {
    echo json_encode(["success" => false, "message" => "Erreur préparation : " . $conn->error]);
    exit;
}

$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();

if ($user && password_verify($password, $user["password"])) {
    echo json_encode([
        "success" => true,
        "user" => [
            "id"       => $user["id"],
            "username" => $user["username"],
            "nom"      => $user["nom"],
            "prenom"   => $user["prenom"],
            "numero"   => $user["numero"]
        ]
    ]);
} else {
    echo json_encode(["success" => false, "message" => "Nom d'utilisateur ou mot de passe incorrect !"]);
}

$stmt->close();
$conn->close();
?>