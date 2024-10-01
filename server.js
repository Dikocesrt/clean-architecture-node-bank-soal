const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');
const { initDb } = require('./config/database');
const cors = require('cors');
const session = require('express-session');

// Middleware
app.use(cors());
app.options('*', cors());
app.use(session({ secret: process.env.JWT_SECRET, cookie: { maxAge: 60000 } }));
app.use(express.json({ limit: '4mb' }));

// Routes
app.use('/api/v1/auth', authRoutes);

// Connect to database
initDb();

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
