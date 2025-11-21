<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");

include 'config.php';

$data = json_decode(file_get_contents("php://input"), true);

$user_id = $data["user_id"];
$total = $data["total_amount"];
$items = $data["items"]; // tableau produits

$conn->begin_transaction();

try {
    // 1️⃣ Insérer la commande
    $sql = "INSERT INTO orders (user_id, total_amount) VALUES ('$user_id', '$total')";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("id", $user_id, $total);
    $stmt->execute();
    $order_id = $conn->insert_id;

    // 2️⃣ Insérer chaque produit
    $sql_item = "INSERT INTO order_items (order_id, product_id, quantity, price)
                 VALUES ('$order_id' ,''$product_id' ,'$quantity','$price')";
    $stmt_item = $conn->prepare($sql_item);

    foreach ($items as $item) {
        $stmt_item->bind_param("iiid", $order_id, $item["product_id"], $item["quantity"], $item["price"]);
        $stmt_item->execute();
    }

    $conn->commit();
    echo json_encode(["success" => true, "order_id" => $order_id]);

} catch (Exception $e) {
    $conn->rollback();
    echo json_encode(["success" => false, "error" => $e->getMessage()]);
}
