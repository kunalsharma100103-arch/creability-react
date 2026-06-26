<?php
require_once __DIR__ . '/../config.php';
cors();
requireAuth();
if ($_SERVER['REQUEST_METHOD'] !== 'POST') json(['error' => 'Method not allowed'], 405);

$links = json_decode(file_get_contents('php://input'), true);
if (!is_array($links)) json(['error' => 'Expected array'], 400);

$stmt = db()->prepare('UPDATE social_links SET url=?, is_active=? WHERE platform=?');
foreach ($links as $link) {
    $stmt->execute([
        trim($link['url']       ?? ''),
        (int)($link['is_active'] ?? 0),
        $link['platform'],
    ]);
}
json(['ok' => true]);
