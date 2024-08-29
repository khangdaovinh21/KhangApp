const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();


app.use(cors());
app.use(bodyParser.json());
app.use(express.json()); 

mongoose.connect('mongodb://127.0.0.1:27017/yourdbname', {
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));
const offerRoutes = require('./routes/offerRoutes');
app.use('/api/offers', offerRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
const corsOptions = {
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Chỉ định rõ các phương thức được phép
  allowedHeaders: ['Content-Type', 'Authorization'] // Đảm bảo rằng headers được phép
};
app.use(cors(corsOptions));