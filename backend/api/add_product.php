<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

include 'config.php'; 

function sendResponse($success, $message = null, $data = null) {
    echo json_encode([
        "success" => $success,
        "message" => $message,
        "data"    => $data
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendResponse(false, "Méthode invalide");
}

if (empty($_POST['nom']) || empty($_POST['prix'])) {
    sendResponse(false, "Nom et prix requis");
}

$nom        = $_POST['nom'];
$prix       = $_POST['prix'];
$description= $_POST['description'] ?? "";
$category   = $_POST['category'] ?? "";
$image_url  = "";

if (isset($_FILES['image']) && $_FILES['image']['error'] === 0) {
    $upload_dir = __DIR__ . '/images/';
    if (!is_dir($upload_dir)) mkdir($upload_dir, 0755, true);

    $filename = uniqid('product_') . "_" . preg_replace("/[^a-zA-Z0-9_.]/", "", basename($_FILES['image']['name']));
    $filepath = $upload_dir . $filename;

    if (!move_uploaded_file($_FILES['image']['tmp_name'], $filepath)) {
        sendResponse(false, "Erreur lors de l'upload de l'image");
    }

    $image_url = "http://localhost/backend/api/images/" . $filename;
}

$sql = "INSERT INTO products (nom, image, prix, description, category) VALUES (?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);

if (!$stmt) {
    sendResponse(false, "Erreur préparation : " . $conn->error);
}

$stmt->bind_param("ssdss", $nom, $image_url, $prix, $description, $category);

if ($stmt->execute()) {
    $newId = $stmt->insert_id ?: $conn->insert_id;
    sendResponse(true, "Produit ajouté avec succès", ["id" => $newId]);
} else {
    sendResponse(false, "Erreur SQL : " . $stmt->error);
}

$stmt->close();
$conn->close();
?>