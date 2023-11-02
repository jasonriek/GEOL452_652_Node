const Database = require('better-sqlite3');
const path = require('path');
const db_path = path.join(__dirname, 'pages.db');
const db = new Database(db_path);


// Create a "pages" table
db.exec(`
  CREATE TABLE IF NOT EXISTS pages (
    id INTEGER PRIMARY KEY,
    title TEXT,
    content TEXT,
    reference TEXT NOT NULL UNIQUE
  )
`);

function createPage(title, content, reference) {
    const insert = db.prepare('INSERT INTO pages (title, content, reference) VALUES (?, ?, ?)');
    insert.run(title, content, reference);
}

function getPageById(id) {
    const query = db.prepare('SELECT * FROM pages WHERE id = ?');
    return query.get(id);
}

function getPageByReference(reference) {
    const query = db.prepare('SELECT * FROM pages WHERE LOWER(reference) = LOWER(?)');
    return query.get(reference);
}
  
function updatePage(id, title, content) {
    const update = db.prepare('UPDATE pages SET title = ?, content = ? WHERE id = ?');
    update.run(title, content, id);
}

function getPageById(id) {
    const query = db.prepare('SELECT * FROM pages WHERE id = ?');
    return query.get(id);
  }
  
function deletePage(id) {
    const deleteQuery = db.prepare('DELETE FROM pages WHERE id = ?');
    deleteQuery.run(id);
}
  

module.exports = {
    createPage,
    getPageById,
    getPageByReference,
    updatePage,
    deletePage
}