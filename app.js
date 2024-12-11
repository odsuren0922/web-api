const express = require('express');

const app = express();
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Odko iluu huurhun zaa');
});

app.use('/', router);

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
