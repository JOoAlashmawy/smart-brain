const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
// const knex = require('knex');
const db = require('./db'); 
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');


const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {res.send('hello bro')});
app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)}); //OR we can use another way to send that like next
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)});
app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)});
app.put('/image', (req, res) => {image.handleImage(req, res, db)});
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)});


app.listen('3000', () => {
  console.log('app is running on port 3000');
});


// var knex = require('knex')({
//   client: 'mysql',
//   connection: {
//     host : '127.0.0.1',
//     user : 'your_database_user',
//     password : 'your_database_password',
//     database : 'myapp_test'
//   }
// });
// OR 
// const db = knex({
//   client: 'pg',
//   version: '13',
//   connection: {
//     host : '127.0.0.1',
//     user : 'joo',
//     password : '',
//     database : 'smart-brain'
//   }
// });

// console.log(db.select('*').from('users').then(console.log))

// console.log(postgres.select('*').from('users').then(console.log))



// const database = {
//   users: [
//     {
//       id: '123',
//       name: 'john',
//       password: 'cookies',
//       email: 'john@gmail.com',
//       entries: 0,
//       joined: new Date(),
//     },
//     {
//       id: '124',
//       name: 'weak',
//       password: 'cookie',
//       email: 'weak@gmail.com',
//       entries: 0,
//       joined: new Date(),
//     },
//   ],
//   login: [
//     {
//       hash: '',
//       id: '',
//       email: '',
//     },
//   ],
// };

    

   
  // db('users')
    //   .returning('*')
    //   .insert({
    //     email: email,
    //     name: name,
    //     joined:new Date()
    //   })
    //   .then(console.log)
        // .then(user => {
        //   res.json(user[0]);
        // })
        // .catch(err => res.status(400).json('unable to register'))
    
  //--------------------------------------------------------------------------------
        
  //   await db.query("INSERT INTO users (email, name, joined) VALUES($1, $2, $3 )", [email, name, new Date()]);
  //   const allUsers = await db.query("SELECT * FROM users WHERE email = $1", [email]);
  //   res.json(allUsers.rows);
  // } catch(err){
  //   console.error(err.message);
  // }


