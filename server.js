// Dependencies
const express = require('express');
// const pokemon = require('./models/pokemon.js');
const app = express();
const PORT = 3000;
const pokemonData = require('./models/pokemon.js');
const methodOverride = require('method-override');
const bodyparser = require('body-parser');

app.use(express.static("public")) // serve files from public statically
app.use(methodOverride('_method'))
app.use(bodyparser.json()) // use bodyparser
app.use(bodyparser.urlencoded({extended: false}))

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
    const pokemonId = req.params.id;
    const selectedPokemon = pokemonData.find(pokemon => pokemon.id == pokemonId);
    res.render('edit.ejs', {pokemon:selectedPokemon});
})

// UPDATE ROUTE
app.put('/pokemon/:id', (req, res) => {
    const pokemonId = req.params.id
    // const updatedName = req.params.name
    console.log('made it here!!')
    const pokemonIndex = pokemonData.findIndex(pokemon => {
        return pokemon.id == pokemonId
    })
    // console.log(req.body.name)
    pokemonData[pokemonIndex].name = req.body.name;
    pokemonData[pokemonIndex].stats.hp = req.body.hp;
    res.redirect('/pokemon');
})

// Listener
app.listen(PORT, () => console.log(`express is listening on port: ${PORT}`));