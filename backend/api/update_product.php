<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

include 'config.php'; // $conn = new mysqli(...)

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(["success" => false, "error" => "Méthode invalide"]);
    exit;
}

$id = intval($_POST['id'] ?? 0);
$nom = trim($_POST['nom'] ?? "");
$prix = trim($_POST['prix'] ?? "");
$description = trim($_POST['description'] ?? "");
$category = trim($_POST['category'] ?? "");
$image_url = $_POST['current_image'] ?? null;

if (!$id || empty($nom) || empty($prix)) {
    echo json_encode(["success" => false, "error" => "ID, nom et prix requis"]);
    exit;
}

if (isset($_FILES['image']) && $_FILES['image']['error'] === 0) {
    $upload_dir = __DIR__ . '/images/';
    if (!is_dir($upload_dir)) mkdir($upload_dir, 0755, true);

    $filename = uniqid('product_') . '_' . preg_replace("/[^a-zA-Z0-9_.]/", "", basename($_FILES['image']['name']));
    $filepath = $upload_dir . $filename;

    if (move_uploaded_file($_FILES['image']['tmp_name'], $filepath)) {
        $image_url = "http://localhost/backend/api/images/" . $filename;
    }
}

$sql = "UPDATE products SET 
            nom = ?, 
            image = ?, 
            prix = ?, 
            description = ?, 
            category = ?
        WHERE id = ?";

$stmt = $conn->prepare($sql);
if (!$stmt) {
    echo json_encode(["success" => false, "error" => "Erreur de préparation : " . $conn->error]);
    exit;
}

$stmt->bind_param("ssdssi", $nom, $image_url, $prix, $description, $category, $id);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Produit modifié avec succès"]);
} else {
    echo json_encode(["success" => false, "error" => "Erreur SQL : " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>