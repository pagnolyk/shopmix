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
        "data" => $data
    ]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendResponse(false, "Méthode invalide");
}

if (empty($_POST['nom']) || empty($_POST['prix'])) {
    sendResponse(false, "Nom et prix requis");
}

$nom = $_POST['nom'];
$prix = $_POST['prix'];
$description = $_POST['description'] ?? "";
$category = $_POST['category'] ?? "";
$image_url = "";

// Upload image
if (isset($_FILES['image']) && $_FILES['image']['error'] === 0) {
    $upload_dir = __DIR__ . '/images/';
    if (!is_dir($upload_dir)) mkdir($upload_dir, 0755, true);

    $filename = uniqid('product_') . "_" . preg_replace("/[^a-zA-Z0-9_.]/", "", basename($_FILES['image']['name']));
    $filepath = $upload_dir . $filename;

    if (move_uploaded_file($_FILES['image']['tmp_name'], $filepath)) {
        $image_url = "http://localhost/backend/api/images/" . $filename;
    }
}

// ✅ Requête préparée correcte
$stmt = $conn->prepare("INSERT INTO products (nom, image, prix, description, category) VALUES ('$nom','$image_url','$prix','$description','$category')");
$stmt->bind_param("sssss", $nom, $image_url, $prix, $description, $category);

if ($stmt->execute()) {
    sendResponse(true, "Produit ajouté avec succès", ["id" => $stmt->insert_id]);
} else {
    sendResponse(false, "Erreur SQL : " . $stmt->error);
}

$stmt->close();
$conn->close();
?>
