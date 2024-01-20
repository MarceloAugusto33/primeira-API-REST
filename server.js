const express = require("express");
const routes = require("./src/routes");
const app = express();

const migrationRun = require("./src/database/sqlite/migration")

migrationRun()

app.use(express.json());

app.use(routes)

const PORT = 3333

app.listen(PORT, () => console.log(`Servidor iniciado na porta ${PORT}`))

