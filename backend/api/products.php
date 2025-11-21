<?php
// Enable CORS for frontend requests
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=utf-8');

// Products data (from frontend assets)
$products = [
    [
        "id" => "1",
        "nom" => "HP Zbook Firefly 14 G8",
        "image" => "PC1.jpg",
        "prix" => "320,000 XAF",
        "description" => "HP Zbook Firefly14 G8 | 04 gb dédié nvidia | 16gb RAM | 512GB SSD stockage",
        "category" => "Ordinateurs"
    ],
    [
        "id" => "2",
        "nom" => "Maillot FC Barcelone 2025/2026",
        "image" => "barca.jpg",
        "prix" => "15,000 XAF",
        "description" => "Maillot de football FC Barcelone 2025/2026 domicile",
        "category" => "Maillots"
    ],
    [
        "id" => "3",
        "nom" => "GAMING ERAZER DUPUTY 15 P1",
        "image" => "PC10.jpg",
        "prix" => "1,000,000 XAF",
        "description" => "GAMING ERAZER DUPUTY 15 P1 [RTX 5060 8Go GDDR7] 1TB SSD 16 Gb de Ram Stockage",
        "category" => "Ordinateurs"
    ],
    [
        "id" => "4",
        "nom" => "Projecteur Epson Power lite 992F",
        "image" => "projecteur.jpg",
        "prix" => "100,000 XAF",
        "description" => "Projecteur Epson power lite 992F 4000 lumens 17.000h",
        "category" => "Projecteurs"
    ],
    [
        "id" => "5",
        "nom" => "Projecteur Epson Power lite 965h",
        "image" => "projecteur2.jpg",
        "prix" => "90,000 XAF",
        "description" => "Projecteur Epson Power lite 965h 3500 lumens 10.000h",
        "category" => "Projecteurs"
    ],
    [
        "id" => "6",
        "nom" => "HP Pro X2 1012 G1 Slim, Tactile Détachable",
        "image" => "PC3.jpg",
        "prix" => "140,000 XAF",
        "description" => "Ordinateur Portable HP Pro X2 1012 G1 Slim, TACTILE Détachable | 8 Go RAM |256 Go SSD Stockage",
        "category" => "Ordinateurs"
    ],
    [
        "id" => "7",
        "nom" => "ASUS ROG Zephyrus G15 Gaming",
        "image" => "PC4.jpg",
        "prix" => "600,000 XAF",
        "description" => "ASUS ROG Zephyrus G15 RYZEN 9 5900HS, 16Go RAM 1TB SSD | NVIDIA RTX 3060 6Go dédié",
        "category" => "Ordinateurs"
    ],
    [
        "id" => "8",
        "nom" => "Maillot Real Madrid 2025/2026",
        "image" => "real.jpg",
        "prix" => "15,000 XAF",
        "description" => "Maillot de football Real Madrid 2025/2026 domicile",
        "category" => "Maillots"
    ],
    [
        "id" => "9",
        "nom" => "Maillot Napoli 2025/2026",
        "image" => "napoli.webp",
        "prix" => "15,000 XAF",
        "description" => "Maillot de football Napoli 2025/2026 domicile",
        "category" => "Maillots"
    ],
    [
        "id" => "10",
        "nom" => "Maillot Napoli 2025/2026 Extérieur",
        "image" => "napoli2.jpg",
        "prix" => "15,000 XAF",
        "description" => "Maillot de football Napoli 2025/2026 extérieur",
        "category" => "Maillots"
    ],
    [
        "id" => "11",
        "nom" => "Maillot Manchester City 2025/2026",
        "image" => "city.jpg",
        "prix" => "15,000 XAF",
        "description" => "Maillot de football Manchester City 2025/2026 extérieur",
        "category" => "Maillots"
    ],
    [
        "id" => "12",
        "nom" => "Lenovo ThinkPad T14 Gen 1",
        "image" => "PC5.jpg",
        "prix" => "180,000 XAF",
        "description" => "Lenovo ThinkPad T14 Gen 1 11th Gen Avec 2Go Dédié 16Go / 256Go SSD",
        "category" => "Ordinateurs"
    ],
    [
        "id" => "13",
        "nom" => "Mack James 4217",
        "image" => "macjames.jpeg",
        "prix" => "25,000 XAF",
        "description" => "Chaussures responsable Mack James | Confortables et élégantes pour toutes les occasions",
        "category" => "Chaussures"
    ],
    [
        "id" => "14",
        "nom" => "Dell Latitude 7410",
        "image" => "PC6.jpg",
        "prix" => "200,000 XAF",
        "description" => "Dell Latitude 7410 |Core i7 10th gén| 16GB RAM | 256GB SSD STOCKAGE",
        "category" => "Ordinateurs"
    ],
    [
        "id" => "15",
        "nom" => "Lenovo Yoga 730 Gaming",
        "image" => "PC7.jpg",
        "prix" => "250,000 XAF",
        "description" => "Lenovo Yoga 730 Gaming | Core i7 8th gén | 16GB RAM | NVIDIA GTX 1050 4Go dédié",
        "category" => "Ordinateurs"
    ],
    [
        "id" => "16",
        "nom" => "Dell latitude 5580 workstation",
        "image" => "PC8.jpg",
        "prix" => "200,000 XAf",
        "description" => "Dell latitude 5580 workstation i7 7em génération couplé à 16GB Ram avec 2GB dédié NVIDIA Gforce 940MX GDDR5",
        "category" => "Ordinateurs"
    ],
    [
        "id" => "17",
        "nom" => "Lenovo Thinkpad X1 Yoga 2th Génération 360° Tactile",
        "image" => "PC9.jpg",
        "prix" => "150,000 XAF",
        "description" => "Lenovo Thinkpad X1 Yoga 2th Génération 360° Tactile avec son Stylet Core i5 7th Génération | 8GB RAM | 256GB SSD Stockage",
        "category" => "Ordinateurs"
    ],
    [
        "id" => "18",
        "nom" => "Dell Latitude 7300 Tactile",
        "image" => "PC2.jpg",
        "prix" => "150,000 XAF",
        "description" => "Dell Latitude 7300 Tactile Core i5 8th gén | 16GB RAM | 256GB SSD Stockage",
        "category" => "Ordinateurs"
    ],
    [
        "id" => "19",
        "nom" => "ASUS ROG STRIX G17 2024",
        "image" => "PC11.jpg",
        "prix" => "900,000 XAF",
        "description" => "ASUS ROG STRIX G17 2024 [RTX 4060,RYZEN 9 7845HX 24CPU] 1TB SSD 16 GB de Ram Stockage",
        "category" => "Ordinateurs"
    ],
    [
        "id" => "20",
        "nom" => "HP VICTUS 16 GAMING",
        "image" => "PC12.jpg",
        "prix" => "700,000 XAF",
        "description" => "HP VICTUS 16 [ i5 13th gen RTX 4060] 512 GB SSD 16 GB de Ram",
        "category" => "Ordinateurs"
    ],
    [
        "id" => "21",
        "nom" => "Souris Gamer INCA IMG-349",
        "image" => "mouse1.jpg",
        "prix" => "30,000 XAF",
        "description" => "Souris Gamer INCA IMG-349 Technologie de connectivité: Filaire - Interface: USB - Résolution optique: jusqu'à 6400 DPI",
        "category" => "Souris"
    ],
    [
        "id" => "22",
        "nom" => "Souris Gamer INCA IMG-309",
        "image" => "mouse2.jpg",
        "prix" => "25,000 XAF",
        "description" => "Souris Gamer INCA IMG-309 Technologie de connectivité: Filaire - Interface: USB - Résolution optique: jusqu'à 7200 DPI",
        "category" => "Souris"
    ],
    [
        "id" => "23",
        "nom" => "Souris Gamer INCA IMG-GT15",
        "image" => "mouse3.jpg",
        "prix" => "30,000 XAF",
        "description" => "Souris Gamer INCA IMG-GT15 Technologie de connectivité: Filaire - Interface: USB - Résolution optique: 4800 DPI",
        "category" => "Souris"
    ],
    [
        "id" => "24",
        "nom" => "Maillot Real Madrid 2025/2026 Extérieur",
        "image" => "real2.webp",
        "prix" => "15,000 XAF",
        "description" => "Maillot de football Real Madrid 2025/2026 extérieur",
        "category" => "Maillots"
    ],
    [
        "id" => "25",
        "nom" => "Maillot Chelsea 2025/2026",
        "image" => "chelsea.jpg",
        "prix" => "15,000 XAF",
        "description" => "Maillot de football Chelsea FC 2025/2026 Domicile",
        "category" => "Maillots"
    ],
    [
        "id" => "26",
        "nom" => "Maillot Manchester United 2025/2026",
        "image" => "manunited.jpg",
        "prix" => "15,000 XAF",
        "description" => "Maillot de football Manchester United 2025/2026 Domicile",
        "category" => "Maillots"
    ],
    [
        "id" => "27",
        "nom" => "Maillot Aston Villa 2025/2026",
        "image" => "villa.jpg",
        "prix" => "15,000 XAF",
        "description" => "Maillot de football Aston Villa 2025/2026 Domicile",
        "category" => "Maillots"
    ],
    [
        "id" => "28",
        "nom" => "Maillot Bayern Munich 2025/2026",
        "image" => "bayern.jpeg",
        "prix" => "15,000 XAF",
        "description" => "Maillot de football Bayern Munich 2025/2026 Exterieur",
        "category" => "Maillots"
    ],
    [
        "id" => "29",
        "nom" => "Maillot Paris FC 2025/2026",
        "image" => "parisfc.jpg",
        "prix" => "15,000 XAF",
        "description" => "Maillot de football Paris FC 2025/2026 Exterieur",
        "category" => "Maillots"
    ],
    [
        "id" => "30",
        "nom" => "Maillot Paris Saint-Germain 2025/2026",
        "image" => "paris.jpg",
        "prix" => "15,000 XAF",
        "description" => "Maillot de football Paris Saint-Germain 2025/2026 Exterieur",
        "category" => "Maillots"
    ],
    [
        "id" => "31",
        "nom" => "New Balance 530v3 Sneakers",
        "image" => "shoes2.jpg",
        "prix" => "15,000 XAF",
        "description" => "New Balance 530v3 Sneakers pour hommes et femmes | Confortables et élégantes pour toutes les occasions",
        "category" => "Chaussures"
    ],
    [
        "id" => "32",
        "nom" => "Dr Martens 1461 Bex Smooth Leather Shoes",
        "image" => "shoes3.jpg",
        "prix" => "25,000 XAF",
        "description" => "Dr Martens 1461 Bex Smooth Leather Shoes | Chaussures en cuir durables et élégantes pour toutes les occasions",
        "category" => "Chaussures"
    ],
    [
        "id" => "33",
        "nom" => "Macbook Pro 13 Retina 2015",
        "image" => "PC13.jpg",
        "prix" => "150,000 XAF",
        "description" => "Macbook Pro 13 Retina 2015 | Core i5 | 8GB RAM | 256GB SSD Stockage elegant et performant",
        "category" => "Ordinateurs"
    ],
    [
        "id" => "34",
        "nom" => "Dell Precision 5550 Mobile Workstation",
        "image" => "PC14.jpg",
        "prix" => "400,000 XAF",
        "description" => "Dell Precision 5550 Mobile Workstation | Intel Core i7-10875H | 32GB RAM | 1TB SSD | NVIDIA Quadro T2000 4GB GDDR6",
        "category" => "Ordinateurs"
    ]
];

// Ensure image paths are full URLs pointing to the backend images folder
$baseImageUrl = 'http://localhost/backend/api/images/';
foreach ($products as &$p) {
    if (!empty($p['image']) && strpos($p['image'], 'http') !== 0) {
        $p['image'] = $baseImageUrl . $p['image'];
    }
}

// Return JSON
echo json_encode($products, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
?>
