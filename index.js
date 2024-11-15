/*const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); 

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.get('/', (req, res) => {
    res.send('Hello, welcome to the Movie Recommendation System!');
});

mongoose.connect('mongodb://localhost:27017/')
.then(() => {
    console.log("Connected to database!");
    })
.catch(() => {
    console.log("Connection failed!");
    }); */