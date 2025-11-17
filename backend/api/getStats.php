<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

// Données fictives (à remplacer par des requêtes BD réelles)
$stats = [
    'total_sales' => '125,450 €',
    'total_orders' => 342,
    'total_customers' => 87,
    'total_products' => 24,
    'sales_by_day' => [
        ['date' => '2025-11-09', 'sales' => 1200],
        ['date' => '2025-11-10', 'sales' => 1850],
        ['date' => '2025-11-11', 'sales' => 950],
        ['date' => '2025-11-12', 'sales' => 2100],
        ['date' => '2025-11-13', 'sales' => 1650],
        ['date' => '2025-11-14', 'sales' => 2340],
        ['date' => '2025-11-15', 'sales' => 1770],
    ]
];

echo json_encode($stats);
?>
