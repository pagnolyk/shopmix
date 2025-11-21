<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

$host = "localhost";
$user = "root";
$password = ""; 
$dbname = "shopmix"; 

$conn = new mysqli($host, $user, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(["error" => "Erreur de connexion à MySQL : " . $conn->connect_error]));
}

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
