const connectDB = require('./startup/db');
const express = require('express');
const app = express();
const products = require('./routes/products');
const users = require('./routes/users');
const auth = require('./routes/auth');
const cors = require('cors');

connectDB();

app.use(cors());
app.use(express.json());
app.use('/api/products', products);
app.use('/api/users', users);
app.use('/api/auth', auth);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});