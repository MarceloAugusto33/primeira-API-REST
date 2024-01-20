const sqliteConnection = require('..');

const createTableUser = require('./createUser');

function migrationRun() {
    const schemas = [
        createTableUser
    ].join('')

    sqliteConnection()
     .then(db => db.exec(schemas))
     .catch(error => console.log(error))
}

module.exports = migrationRun