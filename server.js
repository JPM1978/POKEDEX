// Dependencies
const express = require('express');
const app = express();
const PORT = 3000;
const mongoose = require('mongoose');
const Tweet = require('./models/pokemon.js');


// Database configuration
const DATABASE_URL =
'mongodb+srv://jmayard:Mayard2022@cluster0.lra6jzm.mongodb.net/Pokedex?retryWrites=true&w=majority'
const db = mongoose.connection;

// Connect to MongoDB Atlas
mongoose.connect(DATABASE_URL, {
    useNewUrlParser: true,
	useUnifiedTopology: true,
});


// INDEX
app.get('/', (req, res) => {
    res.render('index.ejs', { data: Pokemon });
    });

// SHOW
app.get('/:id', (req, res) => {
    res.render('show.ejs', { data: Pokemon[req.params.id] });
    });



// Database Connection Error/Success
// Define callback functions for various events
db.on('error', (err) => console.log(err.message + ' is mongod not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));


// Listener
app.listen(PORT, () => console.log(`express is listening on port: ${PORT}`));