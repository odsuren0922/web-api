const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json()); 


const pool = new Pool({
  user: 'postgres',   
  host: 'localhost',   
  database: 'webapp',  
  password: '123456',  
  port: 5432,          
});

app.get('/', (req, res) => {
  res.send('zaa');
});


app.get("/test", async (req, res) => {
  try {
    const result = await pool.query('select * from product');  
    const users = result.rows; 
    
    return res.status(200).json(users);
  } catch (err) {
    console.error('Error executing query', err.stack);
    return res.status(500).json({ message: 'Error connecting to database' });
  }
});
//1.bvteegdehvvn nemeh
app.post("/addProduct" , async(req , res) => {
    const { name, category, brand, price, image, description } = req.body;
    try {
        console.log("blabla");
        const result = await pool.query(
            'INSERT INTO product (name, category, brand, price, image, description) VALUES ($1, $2, $3, $4, $5, $6)',
            [name, category, brand, price, image, description]
          );
          const insertedProduct = result.rows[0];
          return res.status(201).json({message: 'Product added successfully', product: insertedProduct});
    } catch(err) {
        console.log(err);
    }
});
//2. shvvh 
app.get("/products", async (req, res) => {
  try {
    let query = 'SELECT * FROM product';
    const params = [];
    const { category } = req.query;
    if (category) {
      query += ' WHERE category = $1';
      params.push(category);
    }

    const result = await pool.query(query, params);
    return res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error:', err.stack);
    return res.status(500).json({ message: 'Error' });
  }
});
//3.bvrtgvvleh
app.post("/register", async(req,res)=>{
  const {email,password}=req.body;
  try{
    const pass = await bcrypt.hash(password,10);
    const result = await pool.query('insert into users (email,password) values ($1,$2) returning *',
      [email,pass]
    );
    return res.status(201).json({message:'amjilttai',user: result.rows[0]});
  }catch(err){
    console.error('err',err.stack);
    return res.status(500).json({message:'err'});
  }
});
//4.nevtreh
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(401).json({ message: '!' });
    }

    const user = result.rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: '!' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
    return res.status(200).json({ message: 'amjilttai', token });
  } catch (err) {
    console.error('Err', err.stack);
    return res.status(500).json({ message: 'Err' });
  }
});
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
