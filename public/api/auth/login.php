<?php
require_once __DIR__ . '/../config.php';

cors();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json(['error' => 'Method not allowed'], 405);
}

$body = json_decode(file_get_contents('php://input'), true);
$email    = trim($body['email']    ?? '');
$password = trim($body['password'] ?? '');

if (!$email || !$password) {
    json(['error' => 'Email and password are required'], 400);
}

$stmt = db()->prepare('SELECT id, email, password_hash FROM admin_users WHERE email = ? LIMIT 1');
$stmt->execute([$email]);
$user = $stmt->fetch();

if (!$user || !password_verify($password, $user['password_hash'])) {
    // Constant-time response to prevent timing attacks
    password_verify('dummy', '$2y$10$abcdefghijklmnopqrstuuBqRJUj7CBDM9hd1W6yWxNPLqKIJMJ/.');
    json(['error' => 'Invalid credentials'], 401);
}

// Update last_login
db()->prepare('UPDATE admin_users SET last_login = NOW() WHERE id = ?')->execute([$user['id']]);

$token = jwtSign(['sub' => $user['id'], 'email' => $user['email']]);
json(['token' => $token, 'email' => $user['email']]);
