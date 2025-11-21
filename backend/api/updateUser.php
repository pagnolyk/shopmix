<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Allow-Headers: Content-Type");

include 'config.php';

$data = json_decode(file_get_contents("php://input"), true);

$id = $data["id"];
$fullname = $data["fullname"];
$phone = $data["phone"];
$address = $data["address"];
$city = $data["city"];
$country = $data["country"];

$sql = "UPDATE users 
        SET fullname='$fullname', phone='$phone', address='$address', city='$city', country='$country' 
        WHERE id=$id";

$stmt = $conn->prepare($sql);
$stmt->bind_param("sssssi", $fullname, $phone, $address, $city, $country, $id);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Profil mis à jour !"]);
} else {
    echo json_encode(["success" => false, "message" => "Erreur de mise à jour"]);
}
