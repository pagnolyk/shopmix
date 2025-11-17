<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$id = $_GET['id'] ?? null;

if (!$id) {
    echo json_encode(['error' => 'ID manquant']);
    exit;
}

// Données fictives (à remplacer par requête BD SELECT WHERE id = $id)

$stmt = $pdo->prepare("SELECT * FROM products WHERE id = ?");
$stmt->execute([$id]);
$product = $stmt->fetch(PDO::FETCH_ASSOC);
echo json_encode($product);
?>
