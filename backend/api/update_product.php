<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

include 'config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(["success" => false, "error" => "Méthode invalide"]);
    exit;
}

$id = intval($_POST['id'] ?? 0);
$nom = $conn->real_escape_string($_POST['nom'] ?? "");
$prix = $conn->real_escape_string($_POST['prix'] ?? "");
$description = $conn->real_escape_string($_POST['description'] ?? "");
$category = $conn->real_escape_string($_POST['category'] ?? "");
$image_url = $_POST['current_image'] ?? null; // garde l’ancienne image

if (!$id || !$nom || !$prix) {
    echo json_encode(["success" => false, "error" => "ID, nom et prix requis"]);
    exit;
}

// Gestion de l’upload image si nouvelle ajoutée
if (!empty($_FILES['image']['name'])) {
    $upload_dir = __DIR__ . '/images/';
    if (!is_dir($upload_dir)) mkdir($upload_dir, 0755, true);

    $filename = uniqid('product_') . '_' . basename($_FILES['image']['name']);
    $filepath = $upload_dir . $filename;

    if (move_uploaded_file($_FILES['image']['tmp_name'], $filepath)) {
        $image_url = "http://localhost/backend/api/images/" . $filename;
    }
}

// Requête UPDATE
$sql = "UPDATE products SET 
        nom='$nom', 
        prix='$prix', 
        description='$description', 
        category='$category', 
        image='$image_url'
        WHERE id=$id";

if ($conn->query($sql)) {
    echo json_encode(["success" => true, "message" => "Produit modifié"]);
} else {
    echo json_encode(["success" => false, "error" => $conn->error]);
}

$conn->close();
?>
