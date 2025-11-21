<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");

include 'config.php';

$data = json_decode(file_get_contents("php://input"), true);

$user_id = $data["user_id"];
$total   = $data["total_amount"];
$items   = $data["items"];
$fullname = $data["full_name"] ?? "";
$phone = $data["phone"] ?? "";
$address = $data["address"] ?? "";
$payment = $data["payment_method"] ?? "";

$conn->begin_transaction();

try {
    $sql = "INSERT INTO orders (user_id, total_amount, fullname, phone, address, payment_method, status) 
            VALUES (?, ?, ?, ?, ?, ?, 'en cours')";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("idssss", $user_id, $total, $fullname, $phone, $address, $payment);
    $stmt->execute();
    $order_id = $stmt->insert_id;
    $stmt->close();

    $sql_item = "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)";
    $stmt_item = $conn->prepare($sql_item);

    foreach ($items as $item) {
        $product_id = $item["product_id"];
        $quantity   = $item["quantity"];
        $price      = $item["price"];
        $stmt_item->bind_param("iiid", $order_id, $product_id, $quantity, $price);
        $stmt_item->execute();
    }
    $stmt_item->close();

    $conn->commit();
    echo json_encode(["success" => true, "order_id" => $order_id]);

} catch (Exception $e) {
    $conn->rollback();
    echo json_encode(["success" => false, "error" => $e->getMessage()]);
}
?>