const bcrypt = require('bcrypt');
const User = require('../models/userSchema')

const register = async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
        return res.status(400).json({ error: "Passwords do not match" });
    }

    try {
        const existingUser = await User.findOne({ email });
        const existingEmail = await User.findOne({ name });

        if (existingUser || existingEmail) {
            return res.status(400).json({ error: "User is already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ name, email, password: hashedPassword });

        res.status(201).json({ message: "Registration successful" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};

const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ email: username });

        if (!user) {
            return res.status(401).json({ success: false, error: "Username not found" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ success: false, error: "Username or password does not match" });
        }
        res.status(200).json({ success: true, message: `Login successful, welcome ${username}`, redirect: "/main.html" });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Server error" });
    }
};


module.exports = { register, login };