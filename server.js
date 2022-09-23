const express = require('express');
const PORT = process.env.PORT || 3001;
const fs = require('fs');
const path = require('path');
const { notes } = require('./db/db.json');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

const uuid = require('uuid');

const app = express();

app.use(express.static('public')); // middleware that instructs server to make certain files readily available. i.e. public/style.css and public/js files

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data 
app.use(express.json());

// API routes
app.use('/api', apiRoutes);

// HTML routes 
app.use('/', htmlRoutes);

app.listen(PORT, () => { // listen method to run on PORT
    console.log(`API server now on PORT ${PORT}!`)
});