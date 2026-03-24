const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('view engine', 'ejs');

// 🌟 Global Middleware
app.use((req, res, next) => {
    res.locals.currentRoute = req.path;
    next();
});

app.use((req, res, next) => {
    console.log(`Route: ${req.url} | Method: ${req.method} | Time: ${new Date().toLocaleString()}`);
    next();
});

// ================= HOME =================
app.get('/', (req, res) => {
    res.render('home');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

// ================= STUDENT =================
app.get('/register', (req, res) => {
    res.render('student/register');
});

app.post('/submit', (req, res) => {
    const { name, email, course, age } = req.body;
    res.render('student/result', { name, email, course, age });
});

app.get('/student/:name', (req, res) => {
    res.send(`Welcome ${req.params.name} to the Student Portal`);
});

// ================= FEEDBACK =================
app.get('/feedback', (req, res) => {
    res.render('feedback/feedback');
});

app.post('/submit-feedback', (req, res) => {
    const { name, email, rating, comments } = req.body;
    res.render('feedback/result', { name, email, rating, comments });
});

app.get('/search', (req, res) => {
    res.send(`You searched for: ${req.query.topic}`);
});

// ================= SERVER =================
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});