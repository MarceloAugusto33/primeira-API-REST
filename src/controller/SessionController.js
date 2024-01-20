const sqliteConnection = require("../database/sqlite");

class SessionController {
    async get(req, res) {
        const database = await sqliteConnection();
        const { email, password } = req.body;

        const user = await database.get("SELECT * FROM usuario WHERE email = (?)", [email])

        if(!user){
            res.status(400).json({ message: "Email e/ou senha incorretos!" })
            return
        }

        const comparePassword = password === user.password

        if(!comparePassword){
            res.status(400).json({ message: "Email e/ou senha incorretos!" })
            return
        }

        res.status(200).json({ message: "Conta logada" })
    }
}

module.exports = SessionController