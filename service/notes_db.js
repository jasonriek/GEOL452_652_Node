const Database = require('better-sqlite3');
const path = require('path');
const db_path = path.join(__dirname, 'notes.db');
const db = new Database(db_path);
const table_names = ['gravity', 'magnetisism', 'resistivity', 'seismology'];

// Create a "pages" table
function createTable(table_name) {
    db.exec(`
    CREATE TABLE IF NOT EXISTS ${table_name} (
      id INTEGER PRIMARY KEY,
      title TEXT,
      content TEXT
    )
  `);
}

function createNotes(table_name, title, content) {
    const insert = db.prepare(`INSERT INTO ${table_name} (title, content) VALUES (?, ?)`);
    insert.run(title, content);
}

function getNotesById(table_name, id) {
    const query = db.prepare(`SELECT * FROM ${table_name} WHERE id = ?`);
    return query.get(id);
}

function getNotesCount(table_name) {
    const query = db.prepare(`SELECT COUNT(*) as cnt FROM ${table_name}`);
    return query.get().cnt;
}

function updateNotes(table_name, id, title, content) {
    const update = db.prepare(`UPDATE ${table_name} SET title = ?, content = ? WHERE id = ?`);
    update.run(title, content, id);
}
  
function deleteNotes(table_name, id) {
    const deleteQuery = db.prepare(`DELETE FROM ${table_name} WHERE id = ?`);
    deleteQuery.run(id);
}

table_names.forEach((table_name) => {createTable(table_name);});

module.exports = {
    createNotes,
    getNotesById,
    updateNotes,
    deleteNotes,
    getNotesCount
}