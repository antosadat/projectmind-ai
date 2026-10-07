CREATE TABLE IF NOT EXISTS projects (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  file_name TEXT,
  source_type TEXT NOT NULL DEFAULT 'manual',
  data_date TEXT,
  last_updated_at TEXT NOT NULL,
  record_count INTEGER NOT NULL DEFAULT 0,
  data_quality REAL NOT NULL DEFAULT 100,
  version INTEGER NOT NULL DEFAULT 1,
  source_hash TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS refreshes (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL,
  source_file TEXT,
  source_object_key TEXT,
  source_hash TEXT,
  data_date TEXT,
  uploaded_at TEXT NOT NULL,
  processed_at TEXT NOT NULL,
  records_received INTEGER NOT NULL DEFAULT 0,
  records_valid INTEGER NOT NULL DEFAULT 0,
  records_rejected INTEGER NOT NULL DEFAULT 0,
  changed_records INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL,
  error_message TEXT,
  FOREIGN KEY(project_id) REFERENCES projects(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS project_tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  project_id TEXT NOT NULL,
  task_key TEXT NOT NULL,
  task TEXT NOT NULL,
  status TEXT,
  stream TEXT,
  pic TEXT,
  eta TEXT,
  priority TEXT,
  dependency TEXT,
  action TEXT,
  percent TEXT,
  impact TEXT,
  issue TEXT,
  alert TEXT,
  refresh_id TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY(project_id) REFERENCES projects(id) ON DELETE CASCADE,
  FOREIGN KEY(refresh_id) REFERENCES refreshes(id) ON DELETE CASCADE,
  UNIQUE(project_id, task_key)
);

CREATE TABLE IF NOT EXISTS task_history (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  project_id TEXT NOT NULL,
  task_key TEXT NOT NULL,
  refresh_id TEXT NOT NULL,
  task TEXT NOT NULL,
  status TEXT,
  stream TEXT,
  pic TEXT,
  eta TEXT,
  priority TEXT,
  dependency TEXT,
  action TEXT,
  percent TEXT,
  impact TEXT,
  issue TEXT,
  alert TEXT,
  captured_at TEXT NOT NULL,
  FOREIGN KEY(project_id) REFERENCES projects(id) ON DELETE CASCADE,
  FOREIGN KEY(refresh_id) REFERENCES refreshes(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS documents (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  project_id TEXT NOT NULL,
  object_key TEXT NOT NULL UNIQUE,
  file_name TEXT NOT NULL,
  content_type TEXT,
  size_bytes INTEGER NOT NULL DEFAULT 0,
  etag TEXT,
  uploaded_at TEXT NOT NULL,
  FOREIGN KEY(project_id) REFERENCES projects(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS audit_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  project_id TEXT,
  event_type TEXT NOT NULL,
  actor TEXT,
  detail TEXT,
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_refresh_project_date ON refreshes(project_id, processed_at DESC);
CREATE INDEX IF NOT EXISTS idx_tasks_project_status ON project_tasks(project_id, status);
CREATE INDEX IF NOT EXISTS idx_history_project_task ON task_history(project_id, task_key, captured_at DESC);
CREATE INDEX IF NOT EXISTS idx_documents_project ON documents(project_id, uploaded_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_project ON audit_logs(project_id, created_at DESC);