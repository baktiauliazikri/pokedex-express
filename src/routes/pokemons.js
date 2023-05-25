const express = require("express");
const PokemonsController = require("../controller/pokemon");

const router = express.Router();

//read pokemon
router.get("/", PokemonsController.getAllPokemons);

// read mypokemon
router.get('/collection',PokemonsController.getAllMyPokemon);

//get detail
router.get("/:id", PokemonsController.getPokemonById);

//create pokemon
router.post("/", PokemonsController.createNewPokemon);

//create - add pokemon
router.post('/collection',PokemonsController.addToMyPokemon);

//update pokemon
router.put("/:id", PokemonsController.updatePokemon);

//delete pokemon
router.delete("/:id", PokemonsController.deletePokemon);

//delete my pokemon
router.delete('/collection/:id',PokemonsController.deleteMyPokemon);

module.exports = router;
