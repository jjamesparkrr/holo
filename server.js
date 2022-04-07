require("dotenv").config;

const express = require('express');
const {join} = require('path');


const app = express();

//setting up middleware
app.use(express.static(join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// app.use(require("./model"))
app.use(require("./controller"))

async function init() {
    await require("./config/connection").sync();
    app.listen(process.env.PORT || 3000)
    };


init();