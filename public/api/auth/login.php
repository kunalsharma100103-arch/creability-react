<?php
require_once __DIR__ . '/../config.php';

cors();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json(['error' => 'Method not allowed'], 405);
}

$body = json_decode(file_get_contents('php://input'), true);

// ── Password reset flow ───────────────────────────────────
if (isset($body['reset_key'])) {
    $reset_key    = trim($body['reset_key']    ?? '');
    $new_password = trim($body['new_password'] ?? '');
    if (!$reset_key || !$new_password)     { json(['error' => 'Missing fields'], 400); }
    if ($reset_key !== JWT_SECRET)         { json(['error' => 'Invalid reset key'], 403); }
    if (strlen($new_password) < 6)        { json(['error' => 'Password too short'], 400); }
    $hash = password_hash($new_password, PASSWORD_BCRYPT);
    db()->prepare("UPDATE admin_users SET password_hash = ? WHERE username = 'admin'")->execute([$hash]);
    json(['ok' => true]);
}

// ── Normal login flow ─────────────────────────────────────
$email    = trim($body['email']    ?? '');
$password = trim($body['password'] ?? '');

if (!$email || !$password) {
    json(['error' => 'Email and password are required'], 400);
}

$stmt = db()->prepare('SELECT id, email, password_hash FROM admin_users WHERE email = ? LIMIT 1');
$stmt->execute([$email]);
$user = $stmt->fetch();

if (!$user || !password_verify($password, $user['password_hash'])) {
    password_verify('dummy', '$2y$10$abcdefghijklmnopqrstuuBqRJUj7CBDM9hd1W6yWxNPLqKIJMJ/.');
    json(['error' => 'Invalid credentials'], 401);
}

db()->prepare('UPDATE admin_users SET last_login = NOW() WHERE id = ?')->execute([$user['id']]);

$token = jwtSign(['sub' => $user['id'], 'email' => $user['email']]);
json(['token' => $token, 'email' => $user['email']]);
