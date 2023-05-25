const dbPool = require("../config/database");

const getAllPokemons = () => {
  const SQLQuery = "SELECT * from pokemons";
  dbPool.execute(SQLQuery);
  return dbPool.execute(SQLQuery);
};

const getPokemonById = async (id) => {
  const SQLQuery = "SELECT * FROM pokemons WHERE id = ?";
  const [rows] = await dbPool.execute(SQLQuery, [id]);
  return rows;
};

const createNewPokemon = (body) => {
  const SQLQuery = `  INSERT INTO pokemons (name, avatar, moves)
      VALUES ('${body.name}', '${body.avatar}', '${body.moves}')`;

  return dbPool.execute(SQLQuery);
};

const updatePokemon = (name, avatar, moves, id) => {
  const SQLQuery =
    "UPDATE pokemons SET name = ?, avatar = ?, moves = ? WHERE id = ?";
  return dbPool.execute(SQLQuery, [name, avatar, moves, id]);
};

const deletePokemon = (id) => {
  const SQLQuery = "DELETE FROM pokemons WHERE id = ?";
  return dbPool.execute(SQLQuery, [id]);
};

// Section for Collection My Pokemon

const getAllMyPokemon = async () => {
  const sqlQuery = 'SELECT * FROM mypokemon'
  return dbPool.execute(sqlQuery);
}

const addToMyPokemon = async (id_pok, id_user) =>{
  const [result] = await dbPool.execute('INSERT INTO mypokemon (id_pok, id_user) VALUES (?, ?)', [id_pok, id_user]);
  const id = result.insertId;
  return { id, id_pok, id_user };
}

const deleteMyPokemon = async (id) =>{
  const sqlQuery = `DELETE FROM mypokemon where id = ${id}`
  return dbPool.execute(sqlQuery);
}

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
