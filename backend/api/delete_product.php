<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET');
header('Access-Control-Allow-Headers: Content-Type');

include 'config.php';

if (!isset($_GET['id'])) {
    echo json_encode(["message" => "ID manquant"]);
    exit;
}

$id = intval($_GET['id']);

$sql = "DELETE FROM products WHERE id = $id";
if ($conn->query($sql) === TRUE) {
    echo json_encode(["message" => "Produit supprimé avec succès"]);
} else {
    echo json_encode(["message" => "Erreur SQL : " . $conn->error]);
}

$conn->close();
?>
