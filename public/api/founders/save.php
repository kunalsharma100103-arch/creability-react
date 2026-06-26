<?php
require_once __DIR__ . '/../config.php';
cors();
requireAuth();
if ($_SERVER['REQUEST_METHOD'] !== 'POST') json(['error' => 'Method not allowed'], 405);

$b         = json_decode(file_get_contents('php://input'), true);
$id        = (int)($b['id']         ?? 0);
$name      = trim($b['name']        ?? '');
$role      = trim($b['role']        ?? '');
$bio       = trim($b['bio']         ?? '');
$image     = trim($b['image']       ?? '');
$email     = trim($b['email']       ?? '');
$linkedin  = trim($b['linkedin']    ?? '');
$twitter   = trim($b['twitter']     ?? '');
$website   = trim($b['website']     ?? '');
$sort_order= (int)($b['sort_order'] ?? 0);
$is_active = (int)($b['is_active']  ?? 1);

if (!$name) json(['error' => 'Name is required'], 400);

if ($id > 0) {
    $stmt = db()->prepare('UPDATE founders SET name=?,role=?,bio=?,image=?,email=?,linkedin=?,twitter=?,website=?,sort_order=?,is_active=? WHERE id=?');
    $stmt->execute([$name,$role,$bio,$image,$email,$linkedin,$twitter,$website,$sort_order,$is_active,$id]);
    json(['ok' => true, 'id' => $id]);
} else {
    $stmt = db()->prepare('INSERT INTO founders (name,role,bio,image,email,linkedin,twitter,website,sort_order,is_active) VALUES (?,?,?,?,?,?,?,?,?,?)');
    $stmt->execute([$name,$role,$bio,$image,$email,$linkedin,$twitter,$website,$sort_order,$is_active]);
    json(['ok' => true, 'id' => (int)db()->lastInsertId()]);
}
