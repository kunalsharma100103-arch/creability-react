-- ═══════════════════════════════════════════════════════════
--  Creability Solutions — Admin Panel Database Schema
--  Run this once in Hostinger's phpMyAdmin after creating
--  the database (Databases > MySQL Databases in cPanel).
-- ═══════════════════════════════════════════════════════════

-- Admin users
CREATE TABLE IF NOT EXISTS admin_users (
  id            INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  email         VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  last_login    TIMESTAMP NULL,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dynamic verticals (Maths Park, Science Park, etc.)
CREATE TABLE IF NOT EXISTS verticals (
  id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(100) NOT NULL,            -- "Maths Park"
  slug        VARCHAR(100) UNIQUE NOT NULL,     -- "maths-park" → becomes /maths-park URL
  description TEXT,
  hero_image  VARCHAR(255),
  is_active   TINYINT(1) DEFAULT 1,
  sort_order  SMALLINT   DEFAULT 0,
  created_at  TIMESTAMP  DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP  DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Media items within each vertical's gallery
CREATE TABLE IF NOT EXISTS vertical_media (
  id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  vertical_id INT UNSIGNED NOT NULL,
  filename    VARCHAR(255) NOT NULL,           -- stored path e.g. uploads/maths-park/img01.jpg
  alt_text    VARCHAR(255),
  media_type  ENUM('image','gif') DEFAULT 'image',
  sort_order  SMALLINT DEFAULT 0,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (vertical_id) REFERENCES verticals(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Services list
CREATE TABLE IF NOT EXISTS services (
  id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title       VARCHAR(100) NOT NULL,
  description TEXT,
  badge_text  VARCHAR(50),
  icon_value  VARCHAR(255),                    -- emoji char or uploaded filename
  features    JSON,                            -- ["Feature 1", "Feature 2", ...]
  sort_order  SMALLINT   DEFAULT 0,
  is_active   TINYINT(1) DEFAULT 1,
  created_at  TIMESTAMP  DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Key-value store for editable page content
-- page_key format: "home.hero_title", "about.story_text", "contact.phone", etc.
CREATE TABLE IF NOT EXISTS page_content (
  id           INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  page_key     VARCHAR(100) UNIQUE NOT NULL,
  content_type ENUM('text','html','json','image') DEFAULT 'text',
  value        MEDIUMTEXT,
  updated_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ─────────────────────────────────────────────────────────────
--  Seed: First admin user
--  Replace the hash below with: php -r "echo password_hash('YOUR_PASSWORD', PASSWORD_BCRYPT);"
-- ─────────────────────────────────────────────────────────────
INSERT IGNORE INTO admin_users (email, password_hash)
VALUES ('admin@creabilitysolutions.com', 'REPLACE_WITH_BCRYPT_HASH');

-- Seed: Existing Maths Park vertical
INSERT IGNORE INTO verticals (name, slug, description, is_active, sort_order)
VALUES ('Maths Park', 'maths-park-gallery', 'Interactive mathematics learning environment', 1, 1);
