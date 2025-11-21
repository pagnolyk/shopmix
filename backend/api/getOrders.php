<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

// Données fictives de commandes (à remplacer par requêtes BD)
$orders = [
    [
        'id' => 1001,
        'user_id' => 5,
        'total_amount' => 125,000 ,
        'status' => 'Livrée',
        'created_at' => '2025-11-10'
    ],
    [
        'id' => 1002,
        'user_id' => 8,
        'total_amount' => 22,000,
        'status' => 'En cours',
        'created_at' => '2025-11-12'
    ],
    [
        'id' => 1003,
        'user_id' => 12,
        'total_amount' => 215,000,
        'status' => 'Livrée',
        'created_at' => '2025-11-13'
    ],
    [
        'id' => 1004,
        'user_id' => 3,
        'total_amount' =>652,000,
        'status' => 'En attente',
        'created_at' => '2025-11-14'
    ],
    [
        'id' => 1005,
        'user_id' => 15,
        'total_amount' => 422,000,
        'status' => 'En cours',
        'created_at' => '2025-11-15'
    ]
];

echo json_encode($orders);
?>
