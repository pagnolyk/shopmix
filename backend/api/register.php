<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");

include 'config.php';

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode(["success" => false, "message" => "Aucune donnée reçue"]);
    exit;
}

$nom = $data["nom"] ?? "";
$prenom = $data["prenom"] ?? "";
$numero = $data["numero"] ?? "";
$username = $data["username"] ?? "";
$password = $data["password"] ?? "";

if(!$nom || !$prenom || !$numero || !$username || !$password){
    echo json_encode(["success" => false, "message" => "Tous les champs sont requis"]);
    exit;
}

$stmt = $conn->prepare("SELECT * FROM users WHERE username = '$username' OR numero = '$numero'");
$stmt->execute([
    "username" => $username,
    "numero" => $numero
]);
if($stmt->rowCount() > 0){
    echo json_encode(["success" => false, "message" => "Nom d'utilisateur ou numéro déjà utilisé"]);
    exit;
}

$hashedPassword = password_hash($password, PASSWORD_DEFAULT);
$stmt = $conn->prepare("INSERT INTO users (nom, prenom, numero, username, password) 
                        VALUES ('$nom','$prenom', '$numero', '$username', '$hashedPassword')");
if($stmt->execute([
    "nom" => $nom,
    "prenom" => $prenom,
    "numero" => $numero,
    "username" => $username,
    "password" => $hashedPassword
])){
    echo json_encode(["success" => true, "message" => "Inscription réussie !"]);
} else {
    echo json_encode(["success" => false, "message" => "Erreur lors de l'inscription"]);
}
?>
