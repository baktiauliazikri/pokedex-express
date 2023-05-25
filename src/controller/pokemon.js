const PokemonsModel = require("../models/pokemons");

const getAllPokemons = async (req, res) => {
  try {
    const [data] = await PokemonsModel.getAllPokemons();

    res.json({
      message: "GET all Pokemon success",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const getPokemonById = async (req, res) => {
  const pokemonId = req.params.id;

  try {
    const data = await PokemonsModel.getPokemonById(pokemonId);

    if (!data || data.length === 0) {
      return res.status(404).json({
        message: "Pokemon not found",
      });
    }

    res.json({
      message: "Get Pokemon by ID success",
      data: data[0],
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error.message,
    });
  }
};

const createNewPokemon = async (req, res) => {
  const { body } = req;

  try {
    await PokemonsModel.createNewPokemon(body);
    res.json({
      message: "CREATE new pokemon success",
      data: body,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const updatePokemon = (req, res) => {
  const pokemonId = req.params.id;
  const { name, avatar, moves } = req.body;

  PokemonsModel.updatePokemon(name, avatar, moves, pokemonId)
    .then(() => {
      res.json({
        message: "Pokemon updated successfully",
        data: {
          name: name,
          avatar: avatar,
          moves: moves,
        },
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Server Error",
        serverMessage: error,
      });
    });
};

const deletePokemon = (req, res) => {
  const pokemonId = req.params.id;

  PokemonsModel.deletePokemon(pokemonId)
    .then(() => {
      res.json({
        message: "Pokemon deleted successfully",
        data: {
          id: pokemonId,
        },
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Server Error",
        serverMessage: error,
      });
    });
};

//Section for My Pokemon Collection

const getAllMyPokemon = async (req, res) => {
  try {
    const [data] = await PokemonsModel.getAllMyPokemon();
    // console.log("test", data);
    res.json({
      message: "GET All My pokemons Success",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

const addToMyPokemon = async (req, res) => {
  const { id_pok, id_user } = req.body;

  try {
    const pokemon = await PokemonsModel.addToMyPokemon(id_pok, id_user);
    res.json({
      message: "Add To My Pokemons Success",
      data: pokemon,
    });
  } catch (error) {
    console.error("Error creating Pokemon", error);
    res.status(500).json({ error: "Error creating Pokemon" });
  }
};

const deleteMyPokemon = async (req, res) => {
  const { id } = req.params;
  try {
    await PokemonsModel.deleteMyPokemon(id);
    res.json({
      message: "Delete Pokemon Success",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

module.exports = {
  getAllPokemons,
  getPokemonById,
  createNewPokemon,
  updatePokemon,
  deletePokemon,
  getAllMyPokemon,
  addToMyPokemon,
  deleteMyPokemon,
};
