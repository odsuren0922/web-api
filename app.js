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

const userRoutes = require('./src/routes/users.route');
const productRoutes = require('./src/routes/product.route');

app.use('/users' , userRoutes);
app.use('/product' , productRoutes);

app.get('/', (req, res) => {
  res.send('zaa');
});


app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
