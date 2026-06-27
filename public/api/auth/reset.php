<?php
require_once __DIR__ . '/../config.php';
cors();
if ($_SERVER['REQUEST_METHOD'] !== 'POST') { json(['error' => 'Method not allowed'], 405); }
$body        = json_decode(file_get_contents('php://input'), true);
$reset_key   = trim($body['reset_key']   ?? '');
$new_password = trim($body['new_password'] ?? '');
if (!$reset_key || !$new_password)          { json(['error' => 'Missing fields'], 400); }
if ($reset_key !== JWT_SECRET)              { json(['error' => 'Invalid reset key'], 403); }
if (strlen($new_password) < 6)             { json(['error' => 'Password too short'], 400); }
$hash = password_hash($new_password, PASSWORD_BCRYPT);
db()->prepare("UPDATE admin_users SET password_hash = ? WHERE username = 'admin'")->execute([$hash]);
json(['ok' => true]);
