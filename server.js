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


// DELETE ROUTE
app.delete("/pokemon/:id", (req, res) => {
    // get the id from params
    const id = req.params.id
    // delete the pokemon
    pokemon.findByIdAndRemove(id, (err, pokemon) => {
    // redirect user back to index page
    res.redirect("/pokemon")
        })
      })


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
    pokemonData[pokemonIndex].stats.attack = req.body.attack;
    pokemonData[pokemonIndex].stats.defense = req.body.defense;
    res.redirect('/pokemon');
})


// DELETE ROUTE






// Listener
app.listen(PORT, () => console.log(`express is listening on port: ${PORT}`));