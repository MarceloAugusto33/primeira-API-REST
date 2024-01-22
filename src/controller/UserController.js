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
            return
        }
    }

    async update(req, res) {
        try {
            const database = await sqliteConnection();

            const { name, email, newEmail, oldPassword, newPassword } = req.body;

            if (!email && !oldPassword) {
                res.status(400).json({ message: "Digite todos os dados!" })
                return
            }

            const user = await database.get("SELECT * FROM usuario WHERE email = (?)", [email]);

            if (!user) {
                res.status(400).json({ message: "Usuario não existe" })
                return
            }

            if (oldPassword !== user.password) {
                res.status(400).json({ message: "Senha incorreta" });
                return
            }

            user.name = name || user.name;
            user.email = newEmail || user.email;
            user.password = newPassword || user.password

            await database.run(`
                UPDATE usuario
                    SET name = ?,
                        email = ?,
                        password = ?
                        WHERE id = ?`,
            [user.name, user.email, user.password, user.id])

            console.log(user)

            res.status(200).json({ message: "Perfil atualizado!" })
        } catch (error) {
            res.status(500).json({ message: "Internal server error!" })
            return
        }
    }

    async delete(req, res) {

        try {
            const database = await sqliteConnection();

            const { email, password } = req.body;

            if (!email || !password) {
                res.status(400).json({ message: "Dados incompletos!" })
                return
            }

            const user = await database.get("SELECT * FROM usuario WHERE email= (?)", [email])

            if (!user) {
                res.status(400).json({ message: "Usuario não existe" })
                return
            }

            if (password !== user.password) {
                res.status(400).json({ message: "Senha incorreta" })
                return
            }

            await database.run("DELETE FROM usuario WHERE email = ?", [email])

            res.status(200).json({ message: "Conta deletada com sucesso!" });
        } catch (error) {
            res.status(500).json({ message: "Internal server error!" })
            return
        }
    }

    async show(req, res) {
        try {
            const database = await sqliteConnection();

            const { email, password } = req.body;

            if (!email || !password) {
                res.status(400).json({ message: "Dados incompletos!" })
                return
            }

            const user = await database.get("SELECT * FROM usuario WHERE email = ?", [email])

            if (!user) {
                res.status(400).json({ message: "Usuario não existe" })
                return
            }


            if (password !== user.password) {
                res.status(400).json({ message: "Senha incorreta" })
                return
            }

            res.status(200).json({ user })
        } catch (error) {
            res.status(500).json({ message: "Internal server error!" })
            return
        }
    }
}

module.exports = UserController