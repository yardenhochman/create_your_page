\c websites;

DROP TABLE sites;

CREATE TABLE IF NOT EXISTS sites (
  id SERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  occupation TEXT NOT NULL,
  profile_type TEXT NOT NULL,
  profile_pic TEXT NOT NULL,
  facebook TEXT,
  instagram TEXT,
  linkedIn TEXT,
  twitter TEXT,
  email TEXT NOT NULL,
  color1 TEXT NOT NULL,
  color2 TEXT NOT NULL,
  password TEXT NOT NULL,
  picture1 TEXT,
  picture2 TEXT,
  picture3 TEXT
);