require('dotenv').config();
const express = require('express');

const usersRoutes = require('./routes/users');
const pokemonsRoute = require('./routes/pokemons');
const authRoutes = require('./routes/auth');
const mysql = require('mysql2');

const middlewareLogRequest = require('./middleware/logs');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(middlewareLogRequest);
app.use(express.json());

app.use('/users', usersRoutes);
app.use('/pokemons', pokemonsRoute);
app.use('/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
