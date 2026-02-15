CREATE TABLE orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  services TEXT NOT NULL,
  company_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  street TEXT NOT NULL,
  city TEXT NOT NULL,
  zip TEXT NOT NULL,
  service_date TEXT,
  notes TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
