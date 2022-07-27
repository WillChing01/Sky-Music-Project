const express = require('express');
const mongoose = require('mongoose')
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
// const profileRoutes = require('./routes/profileRoutes');

const port = process.env.PORT || 3001;

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));



dotenv.config();
const dbURI = process.env.MONGO_URI;

mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log('connected');
    app.listen(port)
})
.catch(err => console.log(err));


app.use('/api/auth', authRoutes);

// app.use('profile', profileRoutes)