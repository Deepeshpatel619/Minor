const express = require('express');
const app = express();
require('./Database/Connection');
app.use(express.json());
require('dotenv').config();

// we link our router file
app.use(require('./Router/auth'));
app.use(require('./Router/Question'));
app.use(require('./paper/paper'))
const port = process.env.port || process.env.PORT;

app.listen(port, (err) => {
    if (err) return console.log(err);
    console.log(`Server is running on https:/localhost:${port}`);
})

