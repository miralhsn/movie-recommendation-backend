const express = require('express');
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

mongoose.connect('mongodb+srv://miralqureshi:ma7T7xXjWECaFOlV@backenddb.f7hwz.mongodb.net/Web?retryWrites=true&w=majority&appName=BackendDB')
.then(() => {
    console.log("Connected to database!");
    })
.catch(() => {
    console.log("Connection failed!");
    }); 