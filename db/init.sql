CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS users (
id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
username VARCHAR(100),
email VARCHAR(100),
created_at TIMESTAMPTZ DEFAULT now(),
updated_at TIMESTAMPTZ,
hashedpassword TEXT,
role VARCHAR(25) DEFAULT 'user'
);

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS notes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    text TEXT NOT NULL,
    category VARCHAR(25),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER set_updated_at_on_notes
BEFORE UPDATE ON notes
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TYPE access_level_enum AS ENUM ('read', 'edit', 'owner');

CREATE TABLE note_user (
  user_id UUID REFERENCES users(id),
  note_id UUID REFERENCES notes(id),
  access_level access_level_enum DEFAULT 'read',
  PRIMARY KEY (user_id, note_id)
);

CREATE TABLE categories (
  id SERIAL PRIMARY KEY,         -- auto-incrementing ID
  name VARCHAR(100) NOT NULL,    -- category name
  icon VARCHAR(50),              -- optional icon string (e.g. emoji or icon name)
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO categories (name, icon) VALUES
  ('Work', '💼'),
  ('Personal', '🏠'),
  ('Ideas', '💡'),
  ('Urgent', '⚠️');

CREATE TABLE note_categories (
  note_id UUID REFERENCES notes(id) ON DELETE CASCADE,
  category_id INT REFERENCES categories(id) ON DELETE CASCADE,
  PRIMARY KEY (note_id, category_id)
);

INSERT INTO users (id, username, email, hashedpassword, role)
VALUES (
    '08d409e9-ffef-41e6-b6c9-c7ba32dafa81', -- matches the owner_id used in backend until changed, make sure the token is up to date
    'testadminuser',
    'test@example.com',
    '$2b$10$WjJPGqTq6lhZ.sid75m3veT/hNUFCAGdl0BuezyIlq8cRM2ccQU0e', -- hashed password
    'admin'
);