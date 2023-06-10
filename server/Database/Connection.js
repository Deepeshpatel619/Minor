const mongoose = require("mongoose");

const DB = process.env.DB;

mongoose.connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { console.log('Connection Successful') })
    .catch((err) => console.log(err));

