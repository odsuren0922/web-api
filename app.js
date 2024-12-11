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
  res.send('Odko iluu huurhun zaa');
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

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
