const path = require('path');
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 4000;
const userRoutes = require('./routes/users');
const favoriteRoutes=require('./routes/favorites')
require('dotenv').config();

const mongoose = require('mongoose');

// 
mongoose.connect('mongodb://127.0.0.1:27017/morty-project-database')
  .then(() => {
    console.log('MongoDB Connected');
  }).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// 
app.use(express.json());
app.use(cors());

// 
app.use('/api/users', userRoutes);
app.use('/api/favorites', favoriteRoutes);

// React uygulamasının tüm route'larına yönlendir
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// React uygulamasının build dosyalarını sunacak
app.use(express.static(path.join(__dirname, 'client/build')));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
