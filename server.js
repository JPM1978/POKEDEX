// Dependencies
const express = require('express');
const pokemon = require('./models/pokemon.js');
const app = express();
const PORT = 3000;
const pokemonData = require('./models/pokemon.js');



// INDEX
app.get('/pokemon', (req, res) => {
    res.render('index.ejs', {pokemon: pokemonData});
    });

// SHOW
app.get('/pokemon/:id', (req, res) => {
    const pokemonId = req.params.id;
    const selectedPokemon = pokemonData.find(pokemon => pokemon.id == pokemonId);
    res.render('show.ejs',{pokemon:selectedPokemon} );
    });

// EDIT
app.get('/pokemon/:id/edit', (req, res) => {
    res.render('edit.ejs');
})




// Listener
app.listen(PORT, () => console.log(`express is listening on port: ${PORT}`));