const { Pool } = require('pg');
const pool = new Pool({
  user: 'postgres',   
  host: 'localhost',   
  database: 'webapp',  
  password: '123456',  
  port: 5432,          
});

exports.create = async (req, res) => {
  const { name, category, brand, price, image, description } = req.body;
  try {
    console.log("blabla");
    const result = await pool.query(
      "INSERT INTO product (name, category, brand, price, image, description) VALUES ($1, $2, $3, $4, $5, $6)",
      [name, category, brand, price, image, description]
    );
    const insertedProduct = result.rows[0];
    return res.status(201).json({
      message: "Product added successfully",
      product: insertedProduct,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.all = async (req, res) => {
  try {
    const result = await pool.query("select * from product");
    const users = result.rows;

    return res.status(200).json(users);
  } catch (err) {
    console.error("Error executing query", err.stack);
    return res.status(500).json({ message: "Error connecting to database" });
  }
};

exports.getByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const result = await pool.query(
      "SELECT * FROM product WHERE category = $1",
      [category]
    );
    if (!result) {
      return res.status(404).json({ message: "jiijiii" });
    }
    return res.status(404).json(result.rows);
  } catch (err) {
    console.log(err);
  }
};
