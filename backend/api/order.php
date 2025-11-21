<?php
header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, PUT, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

include 'config.php'; 

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $query = " SELECT  o.id, o.fullname AS client, o.total_amount AS total_price, o.status, o.created_at AS date, GROUP_CONCAT(CONCAT(oi.quantity, 'x ', p.nom) SEPARATOR ', ') AS productsFROM orders o
        LEFT JOIN order_items oi ON o.id = oi.order_id LEFT JOIN products p ON oi.product_id = p.id  GROUP BY o.id  ORDER BY o.created_at DESC
    ";

    $result = $conn->query($query);
    $orders = [];

    if ($result) {
        while ($row = $result->fetch_assoc()) {
            $orders[] = $row;
        }
    }

    echo json_encode($orders);
}

if ($method === 'PUT') {
    parse_str(file_get_contents("php://input"), $data);

    $id = intval($data['id'] ?? 0);
    $status = trim($data['status'] ?? '');

    if (!$id || !$status) {
        echo json_encode(["success" => false, "message" => "ID et statut requis"]);
        exit;
    }

    $stmt = $conn->prepare("UPDATE orders SET status = ? WHERE id = ?");
    if (!$stmt) {
        echo json_encode(["success" => false, "message" => "Erreur préparation : " . $conn->error]);
        exit;
    }

    $stmt->bind_param("si", $status, $id);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Statut mis à jour"]);
    } else {
        echo json_encode(["success" => false, "message" => "Erreur SQL : " . $stmt->error]);
    }

    $stmt->close();
}

$conn->close();
?>