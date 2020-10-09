const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

//controllers
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const imageCount = require('./controllers/imageCount');

const db = knex({
    client: 'pg',
    connection: {
        host: 'localhost',
        user: 'postgres',
        password: 'test',
        database: 'smart-brain'
    }
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send("it's working");
})

//signin
app.post('/signin', signin.handleSignIn(db, bcrypt))

//register
app.post('/register', register.handleRegister(db, bcrypt))

//profile_user
app.get('/profile/:id', profile.handleProfileGet(db))

//image count
app.put('/image', imageCount.handleImageCount(db))

//clarifai
app.post('/imageurl', (req, res) => { imageCount.handleApiCall(req, res)})

app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT}`);
})