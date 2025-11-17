<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);

if (!$input || !isset($input['id'])) {
    echo json_encode(['error' => 'Données manquantes']);
    exit;
}

$id = $input['id'];
$nom = $input['nom'] ?? 'Sans nom';
$prix = $input['prix'] ?? '0.00';
$description = $input['description'] ?? '';
$category = $input['category'] ?? 'autre';
$image = $input['image'] ?? 'default.jpg';

// TODO: Mettre à jour dans la BD : UPDATE products SET nom = ?, prix = ?, ...

echo json_encode([
    'success' => true,
    'message' => 'Produit mis à jour avec succès',
    'product' => [
        'id' => $id,
        'nom' => $nom,
        'prix' => $prix,
        'description' => $description,
        'category' => $category,
        'image' => $image
    ]
]);
?>
