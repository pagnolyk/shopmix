<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$id = $_GET['id'] ?? null;

if (!$id) {
    echo json_encode(['error' => 'ID manquant']);
    exit;
}

// TODO: Supprimer de la BD : DELETE FROM products WHERE id = $id

echo json_encode([
    'success' => true,
    'message' => 'Produit supprimé avec succès'
]);
?>
