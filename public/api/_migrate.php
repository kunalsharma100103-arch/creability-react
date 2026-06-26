<?php
require_once __DIR__ . '/config.php';
cors();

$results = [];

function run(string $sql, string $label): void {
    global $results;
    try {
        db()->exec($sql);
        $results[] = ['ok' => true,  'label' => $label];
    } catch (PDOException $e) {
        $results[] = ['ok' => false, 'label' => $label, 'error' => $e->getMessage()];
    }
}

// Add columns to services table
run("ALTER TABLE services ADD COLUMN cover_image VARCHAR(255) AFTER icon_value", "services.cover_image");
run("ALTER TABLE services ADD COLUMN link_url VARCHAR(255) AFTER features", "services.link_url");

// Add link_url to verticals
run("ALTER TABLE verticals ADD COLUMN link_url VARCHAR(255) AFTER description", "verticals.link_url");

// Founders table
run("CREATE TABLE IF NOT EXISTS founders (
  id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(100) NOT NULL,
  role        VARCHAR(100),
  bio         TEXT,
  image       VARCHAR(255),
  email       VARCHAR(255),
  linkedin    VARCHAR(255),
  twitter     VARCHAR(255),
  website     VARCHAR(255),
  sort_order  SMALLINT DEFAULT 0,
  is_active   TINYINT(1) DEFAULT 1,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4", "create founders");

// Social links table
run("CREATE TABLE IF NOT EXISTS social_links (
  id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  platform    VARCHAR(50) NOT NULL,
  url         VARCHAR(255),
  is_active   TINYINT(1) DEFAULT 1,
  sort_order  SMALLINT DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4", "create social_links");

// Seed social platforms if empty
run("INSERT IGNORE INTO social_links (platform, url, is_active, sort_order) VALUES
  ('facebook',  '', 0, 1),
  ('instagram', '', 0, 2),
  ('linkedin',  '', 0, 3),
  ('twitter',   '', 0, 4),
  ('youtube',   '', 0, 5),
  ('tiktok',    '', 0, 6),
  ('whatsapp',  '', 0, 7)", "seed social_links");

json(['results' => $results]);
