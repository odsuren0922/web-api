const { Pool } = require("pg");
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "webapp",
  password: "123456",
  port: 5432,
});

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "Web_app"

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: "Insert all fields" });
    }

    const foundUser = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (foundUser.rows.length > 0) {
      return res.status(400).json({ message: "Already registered" });
    }
    const pass = await bcrypt.hash(password, 10);
    const result = await pool.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
      [username, email, pass]
    );
    return res
      .status(201)
      .json({ message: "Registration successful", user: result.rows[0] });
  } catch (err) {
    console.log(err);
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (result.rows.length === 0) {
      return res.status(401).json({ message: "!" });
    }

    const user = result.rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "!" });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });
    return res.status(200).json({ message: "amjilttai", token });
  } catch (err) {
    console.log(err);
  }
};
