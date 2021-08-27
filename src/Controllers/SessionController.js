const { User } = require('../database/models')
class SessionController {
    async store(req, res) {
        let { name, email, password } = req.body
        const user = await User.findOne({ where: { email } });
        if (user) {
            return res.status(401).json({ error: true, message: "User already exists" });
        }
        let createdUser = await User.create({ name, email, password })
        return res.status(200).json({ createdUser })

    }
    async authentication(req, res) {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ error: true, message: "User not found" })
        }
        if (!(await user.checkPassword(password))) {
            return res.status(401).json({ error: true, message: "Password or email is incorrect;" })
        }
        return res.json({user, token: user.generateToken()});
    }
}
module.exports = new SessionController();