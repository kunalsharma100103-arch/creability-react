<?php
require_once __DIR__ . '/../config.php';
cors();
requireAuth();
if ($_SERVER['REQUEST_METHOD'] !== 'POST') json(['error' => 'Method not allowed'], 405);
$b  = json_decode(file_get_contents('php://input'), true);
$id = (int)($b['id'] ?? 0);
if (!$id) json(['error' => 'ID required'], 400);
db()->prepare('DELETE FROM founders WHERE id=?')->execute([$id]);
json(['ok' => true]);
