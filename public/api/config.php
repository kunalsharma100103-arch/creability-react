<?php
// ─────────────────────────────────────────────────────────────
// Database & JWT configuration
// IMPORTANT: Do NOT commit this file to git.
// ─────────────────────────────────────────────────────────────

define('DB_HOST', 'localhost');
define('DB_NAME', 'u228852813_creability');
define('DB_USER', 'u228852813_admin');
define('DB_PASS', '0c@A*5hPn>F');

define('JWT_SECRET', '3fc2802818bc702badb47a39ed88759a9012f9b29db6eb93772e133c1690617a');
define('JWT_EXPIRY', 86400); // 24 hours in seconds

function db(): PDO {
    static $pdo = null;
    if ($pdo === null) {
        $pdo = new PDO(
            'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8mb4',
            DB_USER,
            DB_PASS,
            [
                PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            ]
        );
    }
    return $pdo;
}

function cors(): void {
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    $allowed = ['https://www.creabilitysolutions.com', 'http://localhost:5173'];
    if (in_array($origin, $allowed, true)) {
        header('Access-Control-Allow-Origin: ' . $origin);
    }
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    header('Content-Type: application/json; charset=utf-8');
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }
}

function json(array $data, int $code = 200): never {
    http_response_code($code);
    echo json_encode($data);
    exit;
}

// ── Minimal JWT (no external library needed) ─────────────────
function jwtSign(array $payload): string {
    $header  = base64url(json_encode(['alg' => 'HS256', 'typ' => 'JWT']));
    $payload['exp'] = time() + JWT_EXPIRY;
    $body    = base64url(json_encode($payload));
    $sig     = base64url(hash_hmac('sha256', "$header.$body", JWT_SECRET, true));
    return "$header.$body.$sig";
}

function jwtVerify(string $token): ?array {
    $parts = explode('.', $token);
    if (count($parts) !== 3) return null;
    [$header, $body, $sig] = $parts;
    $expected = base64url(hash_hmac('sha256', "$header.$body", JWT_SECRET, true));
    if (!hash_equals($expected, $sig)) return null;
    $payload = json_decode(base64_decode(strtr($body, '-_', '+/')), true);
    if (!$payload || $payload['exp'] < time()) return null;
    return $payload;
}

function base64url(string $data): string {
    return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
}

function requireAuth(): array {
    $auth = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
    $token = str_starts_with($auth, 'Bearer ') ? substr($auth, 7) : '';
    $payload = $token ? jwtVerify($token) : null;
    if (!$payload) { json(['error' => 'Unauthorised'], 401); }
    return $payload;
}
