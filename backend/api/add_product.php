<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

$nom = $_POST['nom'] ?? null;
$prix = $_POST['prix'] ?? null;
$description = $_POST['description'] ?? null;
$category = $_POST['category'] ?? 'autre';

if (!$nom || !$prix) {
    echo json_encode(['success' => false, 'error' => 'Nom et prix requis']);
    exit;
}

$image_url = null;

// Gestion de l'upload d'image
if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
    $upload_dir = __DIR__ . '/images/';
    if (!is_dir($upload_dir)) {
        mkdir($upload_dir, 0755, true);
    }

    $filename = uniqid('product_') . '_' . basename($_FILES['image']['name']);
    $filepath = $upload_dir . $filename;

    if (move_uploaded_file($_FILES['image']['tmp_name'], $filepath)) {
        $image_url = 'http://localhost/backend/api/image.php?file=' . $filename;
    }
}

// TODO: Insérer dans la BD
// INSERT INTO products (nom, prix, description, category, image) VALUES (?, ?, ?, ?, ?)

echo json_encode([
    'success' => true,
    'message' => 'Produit ajouté avec succès',
    'product' => [
        'nom' => $nom,
        'prix' => $prix,
        'description' => $description,
        'category' => $category,
        'image' => $image_url
    ]
]);
?>
