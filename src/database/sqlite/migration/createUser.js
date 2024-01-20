const createTableUser = `
    CREATE TABLE IF NOT EXISTS usuario (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR,
        email VARCHAR,
        password VARCHAR
    )`

module.exports = createTableUser