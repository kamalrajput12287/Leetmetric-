const express = require('express');
const path = require('path');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;

// Configure EJS and static files
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => res.render('home', { activePage: 'home' }));
app.get('/analysis', (req, res) => res.render('analysis', { activePage: 'analysis' }));
app.get('/about', (req, res) => res.render('about', { activePage: 'about' }));
app.get('/help', (req, res) => res.render('help', { activePage: 'help' }));
app.get('/leaderboard', (req, res) => res.render('leaderboard', { activePage: 'leaderboard' }));

// API endpoint
app.get('/api/:username', async (req, res) => {
  try {
    const response = await fetch(`https://leetcode-stats-api.herokuapp.com/${req.params.username}`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user data' });
  }
});

// 404 Handler
app.use((req, res) => res.status(404).render('404'));

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));