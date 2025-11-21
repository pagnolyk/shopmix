<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

include 'config.php'; 

$id = $_GET['id'] ?? null;
$id = intval($id);

if (!$id) {
    echo json_encode(['success' => false, 'error' => 'ID manquant']);
    exit;
}


$sql = "SELECT * FROM products WHERE id = ?";
$stmt = $conn->prepare($sql);

if (!$stmt) {
    echo json_encode(['success' => false, 'error' => 'Erreur préparation : ' . $conn->error]);
    exit;
}

$stmt->bind_param("i", $id);
$stmt->execute();

$result = $stmt->get_result();
$product = $result->fetch_assoc();

if ($product) {
    echo json_encode(['success' => true, 'data' => $product]);
} else {
    echo json_encode(['success' => false, 'error' => 'Produit introuvable']);
}

$stmt->close();
$conn->close();
?>