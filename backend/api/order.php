<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST,GET,PUT,OPTIONS");


include 'config.php'; 

$method = $_SERVER['REQUEST_METHOD'];

if ($method == 'GET') {

    $query = "SELECT * FROM orders ORDER BY date DESC";
    $result = mysqli_query($conn, $query);
    $orders = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $orders[] = $row;
    }
    echo json_encode($orders);
}

if ($method == 'PUT') {

    parse_str(file_get_contents("php://input"), $data);
    $id = $data['id'];
    $status = $data['status'];
    
    $query = "UPDATE orders SET status='$status' WHERE id=$id";
    if(mysqli_query($conn, $query)){
        echo json_encode(["message" => "Statut mis à jour"]);
    } else {
        echo json_encode(["message" => "Erreur"]);
    }
}
?>
