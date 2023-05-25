const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authModel = require("../models/auth");
const dbPool = require("../config/database");

const login = async (req, res) => {
  const { email, password } = req.body;

  console.log("test", email, password);

  try {
    // Cari pengguna berdasarkan email
    const user = await authModel.findByEmail(email);
    console.log("user:", user);

    if (!user) {
      return res
        .status(400)
        .json({ message: "Nama pengguna dan kata sandi diperlukan" });
    }

    // Verifikasi kata sandi
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log("test password", isPasswordValid);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Kata sandi tidak valid" });
    }

    // Jika verifikasi berhasil, buat token otentikasi menggunakan jsonwebtoken
    const token = jwt.sign({ userId: user.id }, "secret-key");

    // Kirim token sebagai respons
    res.json({ token });
  } catch (err) {
    console.error("Terjadi kesalahan saat melakukan login:", err);
    res.status(500).json({ message: "Terjadi kesalahan saat melakukan login" });
  }
};

const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const checkDuplicateQuery =
      "SELECT COUNT(*) AS count FROM users WHERE email = ?";
    const [rows] = await dbPool.execute(checkDuplicateQuery, [email]);
    const count = rows[0].count;

    if (count > 0) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await dbPool.execute(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
    );
    const id = result.insertId;

    res.json({ id, name, email });
  } catch (err) {
    console.error("Error registering user:", err);
    res.status(500).json({ message: "Error registering user" });
  }
};

module.exports = {
  login,
  register,
};
