const dbPool = require("../config/database");

const login = async (email) => {
  const [rows] = await dbPool.execute("SELECT * FROM users WHERE email = ?", [
    email,
  ]);
  return rows[0];
};
const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await AuthModel.createUserRegister(name, email, password);
    res.status(201).json({
      message: "Create New users Success",
      // Mengirimkan data dummy berdasarkan request body
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch users",
      error: error.message,
    });
  }
};
const findByEmail = async (email) => {
  const SQLQuery = "SELECT * FROM users WHERE email = ?";
  const [rows] = await dbPool.execute(SQLQuery, [email]);
  return rows[0] || null;
};

module.exports = {
  login,
  findByEmail,
  register,
};
