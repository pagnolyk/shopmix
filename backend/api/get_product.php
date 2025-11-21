<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

include 'config.php';

$id = $_GET['id'] ?? null;

if (!$id) {
    echo json_encode(['error' => 'ID manquant']);
    exit;
}

$stmt = $conn->prepare("SELECT * FROM products WHERE id = $id");
$stmt->execute([$id]);
$product = $stmt->fetch(PDO::FETCH_ASSOC);

echo json_encode($product);
?>
