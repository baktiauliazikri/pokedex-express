const dbPool = require("../config/database");

const getAllUsers = () => {
  const SQLQuery = "SELECT * from users";
  dbPool.execute(SQLQuery);
  return dbPool.execute(SQLQuery);
};

// const createNewUser = (body) => {
//   const SQLQuery = `  INSERT INTO users (name, email, password)
//     VALUES ('${body.name}', '${body.email}', '${body.password}')`;

//   return dbPool.execute(SQLQuery);
// };
// const updateUser = (body, idUser) => {
//   const SQLQuery = `  UPDATE users
//     SET name='${body.name}', email='${body.email}', password='${body.password}'
//     WHERE id=${idUser}`;

//   return dbPool.execute(SQLQuery);
// };

// const deleteUser = (idUser) => {
//   const SQLQuery = `DELETE FROM users WHERE id=${idUser}`;

//   return dbPool.execute(SQLQuery);
// };
// const findByEmail = (email) => {
//   return new Promise((resolve, reject) => {
//     const SQLQuery = "SELECT * FROM users WHERE email = ?";
//     connection.query(SQLQuery, [email], (err, result) => {
//       if (err) {
//         reject(err);
//         return;
//       }
//       resolve(result[0]);
//     });
//   });
// };

  (module.exports = {
    getAllUsers,
    // findByEmail,
    //   createNewUser,
    //   updateUser,
    //   deleteUser,
  });
