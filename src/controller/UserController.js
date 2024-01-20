const sqliteConnection = require("../database/sqlite")
class UserController {
    async create(req, res) {
        try {
            const database = await sqliteConnection();

            const { name, email, password } = req.body

            const userExisted = await database.get("SELECT * FROM usuario WHERE email = (?)", [email])


            if (userExisted) {
                console.log(userExisted)
                res.status(401).json({ message: "Ja existe um usuario com esse email" })
                return
            }

            const userID = await database.run('INSERT INTO usuario(name, email, password) VALUES (?, ?, ?)', [name, email, password])


            res.status(201).json({ message: "Usuario Cadastrado com sucesso!" })
        } catch (error) {
            res.status(401).json({ message: "Usuario nao cadastrado" })
        }
    }
}

module.exports = UserController