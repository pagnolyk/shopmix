<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$servername = "localhost";
$username = "root"; // modifie si nécessaire
$password = "";     // modifie si nécessaire
$dbname = "shopmix"; // ton nom de BD

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

$searchQuery = isset($_GET['query']) ? $_GET['query'] : "";

$sql = "SELECT * FROM products WHERE nom LIKE ?";
$stmt = $conn->prepare($sql);
$param = "%".$searchQuery."%";
$stmt->bind_param("s", $param);
$stmt->execute();
$result = $stmt->get_result();

$products = [];
while ($row = $result->fetch_assoc()) {
    $products[] = $row;
}

echo json_encode($products);
$conn->close();
?>
