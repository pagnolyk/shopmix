<?php
// Autoriser l’accès API
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

// Connexion à la base de données
$host = "localhost";
$user = "root";
$password = ""; // mets ton mot de passe si tu en as un
$dbname = "shopmix"; // ⚠️ Mets ici le nom exact de ta base

$conn = new mysqli($host, $user, $password, $dbname);

// Vérifier la connexion
if ($conn->connect_error) {
    die(json_encode(["error" => "Erreur de connexion à MySQL : " . $conn->connect_error]));
}

// Requête SQL pour récupérer les produits
$sql = "SELECT * FROM products";
$result = $conn->query($sql);


$products = [];

while ($row = $result->fetch_assoc()) {
    $products[] = $row;
}

$baseImageUrl = 'http://localhost/backend/api/images/';
foreach ($products as &$p) {
    if (!empty($p['image']) && strpos($p['image'], 'http') !== 0) {
        $p['image'] = $baseImageUrl . $p['image'];
    }
}

echo json_encode($products, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
$conn->close();
?>
