<?php
require_once __DIR__ . '/../config.php';
cors();
requireAuth();
if ($_SERVER['REQUEST_METHOD'] !== 'POST') json(['error' => 'Method not allowed'], 405);

$b = json_decode(file_get_contents('php://input'), true);
$id          = (int)($b['id'] ?? 0);
$title       = trim($b['title']       ?? '');
$description = trim($b['description'] ?? '');
$badge_text  = trim($b['badge_text']  ?? '');
$icon_value  = trim($b['icon_value']  ?? '');
$cover_image = trim($b['cover_image'] ?? '');
$link_url    = trim($b['link_url']    ?? '');
$features    = json_encode($b['features'] ?? []);
$sort_order  = (int)($b['sort_order']  ?? 0);
$is_active   = (int)($b['is_active']   ?? 1);

if (!$title) json(['error' => 'Title is required'], 400);

if ($id > 0) {
    $stmt = db()->prepare('UPDATE services SET title=?,description=?,badge_text=?,icon_value=?,cover_image=?,link_url=?,features=?,sort_order=?,is_active=? WHERE id=?');
    $stmt->execute([$title,$description,$badge_text,$icon_value,$cover_image,$link_url,$features,$sort_order,$is_active,$id]);
    json(['ok' => true, 'id' => $id]);
} else {
    $stmt = db()->prepare('INSERT INTO services (title,description,badge_text,icon_value,cover_image,link_url,features,sort_order,is_active) VALUES (?,?,?,?,?,?,?,?,?)');
    $stmt->execute([$title,$description,$badge_text,$icon_value,$cover_image,$link_url,$features,$sort_order,$is_active]);
    json(['ok' => true, 'id' => (int)db()->lastInsertId()]);
}
