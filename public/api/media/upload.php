<?php
require_once __DIR__ . '/../config.php';
cors();
requireAuth();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') json(['error' => 'Method not allowed'], 405);

$file = $_FILES['file'] ?? null;
if (!$file || $file['error'] !== UPLOAD_ERR_OK) {
    json(['error' => 'No file uploaded or upload error'], 400);
}

$allowed = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
$mime    = mime_content_type($file['tmp_name']);
if (!in_array($mime, $allowed)) {
    json(['error' => 'Only JPG, PNG, GIF, WebP allowed'], 400);
}

$ext     = match($mime) {
    'image/jpeg' => 'jpg',
    'image/png'  => 'png',
    'image/gif'  => 'gif',
    'image/webp' => 'webp',
    default      => 'jpg',
};

$folder  = $_POST['folder'] ?? 'general';
$folder  = preg_replace('/[^a-z0-9_-]/', '', strtolower($folder));
$dir     = __DIR__ . '/../../uploads/' . $folder . '/';

if (!is_dir($dir)) mkdir($dir, 0755, true);

$name    = time() . '_' . bin2hex(random_bytes(4)) . '.' . $ext;
$path    = $dir . $name;

if (!move_uploaded_file($file['tmp_name'], $path)) {
    json(['error' => 'Failed to save file'], 500);
}

json(['url' => '/uploads/' . $folder . '/' . $name]);
