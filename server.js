
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const { connectDB } = require("./config/db");
const User = require("./models/userSchema");


require("dotenv").config();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


connectDB();


app.post("/register", async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
        return res.status(400).json({ error: "Passwords do not match" });
    }

    try {

        const existingUser = await User.findOne({ email });
        const existingEmail = await User.findOne({ name });


        if (existingUser || existingEmail) {
            alert("User is already registered")
            return res.status(400).json({ error: "User is already registered" });
        }


        const hashedPassword = await bcrypt.hash(password, 10);

 
        await User.create({ name, email, password: hashedPassword });

        res.status(201).json({ message: "Registration successful" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});


app.post("/login", async (req, res) => {

    const { username, password } = req.body;

    try {
    
        const user = await User.findOne({ email: username });

        if (!user) {
            alert("User exists")
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
});


app.get("/users", async (req, res) => {
    try {

        const users = await User.find();

        res.status(200).json(users);
    } catch (error) {

        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});


app.delete("/users/delete", async (req, res) => {
    try {

        await User.deleteMany();

        res.status(200).json({ message: "All users deleted successfully" });
    } catch (error) {
       
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});


const port = process.env.PORT || 5500;
app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));
