<?php
header('Access-Control-Allow-Origin: *');

$filename = $_GET['file'] ?? null;

if (!$filename) {
    http_response_code(400);
    echo 'Fichier manquant';
    exit;
}

// Sécurité : éviter les traversées de répertoires
$filename = basename($filename);
$filepath = __DIR__ . '/images/' . $filename;

if (!file_exists($filepath)) {
    http_response_code(404);
    echo 'Fichier non trouvé';
    exit;
}

// Déterminer le type MIME
$ext = strtolower(pathinfo($filename, PATHINFO_EXTENSION));
$mimes = [
    'jpg' => 'image/jpeg',
    'jpeg' => 'image/jpeg',
    'png' => 'image/png',
    'gif' => 'image/gif',
    'webp' => 'image/webp',
    'avif' => 'image/avif'
];

$mime = $mimes[$ext] ?? 'application/octet-stream';
header('Content-Type: ' . $mime);
header('Content-Length: ' . filesize($filepath));

readfile($filepath);
?>
