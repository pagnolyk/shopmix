<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");

include 'config.php';

$data = json_decode(file_get_contents("php://input"), true);

if(!$data){
    echo json_encode(["success" => false, "message" => "Aucune donnée reçue"]);
    exit;
}

$username = $data["username"] ?? "";
$password = $data["password"] ?? "";

if(!$username || !$password){
    echo json_encode(["success" => false, "message" => "Tous les champs sont requis"]);
    exit;
}
$stmt = $conn->prepare("SELECT * FROM users WHERE username = '$username'");
$stmt->execute(["username" => $username]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if ($user && password_verify($password, $user["password"])) {
    echo json_encode([
        "success" => true,
        "user" => [
            "id" => $user["id"],
            "username" => $user["username"],
            "nom" => $user["nom"],
            "prenom" => $user["prenom"],
            "numero" => $user["numero"]
        ]
    ]);
} else {
    echo json_encode(["success" => false, "message" => "Nom d'utilisateur ou mot de passe incorrect !"]);
}
?>
