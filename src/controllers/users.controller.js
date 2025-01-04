exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    try {
      const pass = await bcrypt.hash(password, 10);
      const result = await pool.query(
        "insert into users (email,password) values ($1,$2) returning *",
        [email, pass]
      );
      return res
        .status(201)
        .json({ message: "amjilttai", user: result.rows[0] });
    } catch (err) {
      console.error("err", err.stack);
      return res.status(500).json({ message: "err" });
    }
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
    console.error("Err", err.stack);
    return res.status(500).json({ message: "Err" });
  }
};
