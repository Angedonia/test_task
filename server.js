const express = require('express');
const sequelize = require('./db');
const PostRoutes = require('./routes/PostRoutes');

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/posts', PostRoutes);

app.get('/', (req, res) => {
    res.status(200).json('Server is working!');
});

sequelize.sync()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch(error => {
        console.error('Database connection error:', error); //
    });

module.exports = app;
