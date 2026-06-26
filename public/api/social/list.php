<?php
require_once __DIR__ . '/../config.php';
cors();
$rows = db()->query('SELECT * FROM social_links ORDER BY sort_order, id')->fetchAll();
json($rows);
