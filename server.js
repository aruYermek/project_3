const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const authRoutes = require('./routes/authRoutes'); 
const { connectDB } = require("./config/db");
const User = require("./models/userSchema");
const multer = require('multer');



const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({ secret: '_secret_key', resave: false, saveUninitialized: true }));
app.use(express.static('public'));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+ '/public/register.html'));
});

app.use('/auth', authRoutes);

require("dotenv").config();

connectDB();

// Настройка multer для сохранения файлов
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/uploads/'); 
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

// Добавь новый маршрут для получения данных профиля текущего пользователя
app.get("/profile", async (req, res) => {
    try {
        const currentUserEmail = req.session.userEmail; // Получаем email текущего пользователя из сессии
        const user = await User.findOne({ email: currentUserEmail }); // Находим пользователя по email

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Возвращаем данные о пользователе в формате JSON
        res.status(200).json({
            name: user.name,
            email: user.email,
            bio: user.bio,
            // Другие данные о пользователе, которые вы хотите вернуть
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});



app.get("/edit-profile", upload.single('avatar'), async (req, res) => {
    const { bio } = req.body;
    const avatar = req.file; 
    const userEmail =  req.session.userEmail; // Предполагается, что вы отправляете email в запросе

    try {
        // Найдите пользователя по email
        const user = await User.findOne({ email: userEmail });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Обновление информации в базе данных
        user.bio = bio;
        if (avatar) {
            user.avatar = avatar.filename;
        }
        
        await user.save();

        res.status(200).json({ message: "Profile updated successfully", updatedUser: user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

app.get("/search", async (req, res) => {
    const { email } = req.query;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({
            name: user.name,
            email: user.email,
            bio: user.bio
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});


const port = process.env.PORT || 5500;
app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));
