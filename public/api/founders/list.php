<?php
require_once __DIR__ . '/../config.php';
cors();
requireAuth();
$rows = db()->query('SELECT * FROM founders ORDER BY sort_order, id')->fetchAll();
json($rows);
