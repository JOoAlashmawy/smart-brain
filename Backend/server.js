const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
// const knex = require('knex');
const db = require('./db'); 

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

const app = express();

app.use(bodyParser.json());
app.use(cors());

const database = {
  users: [
    {
      id: '123',
      name: 'john',
      password: 'cookies',
      email: 'john@gmail.com',
      entries: 0,
      joined: new Date(),
    },
    {
      id: '124',
      name: 'weak',
      password: 'cookie',
      email: 'weak@gmail.com',
      entries: 0,
      joined: new Date(),
    },
  ],
  login: [
    {
      hash: '',
      id: '',
      email: '',
    },
  ],
};

app.get('/', (req, res) => {
  res.send(database.users);
});

app.post('/signin', (req, res) => {
  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  ) {
    res.json('success');
  } else {
    res.status(400).json('error logging in');
  }
});


app.post('/register', async(req, res) => {
  try{  
    const { email, name, password } = req.body;
    const hash = bcrypt.hashSync(password);
    console.log(hash);
    await db.query("BEGIN")
    await db.query("INSERT INTO login (hash, email) VALUES($1, $2)",[hash,email]) 
    const user = await db.query("INSERT INTO users (email, name, joined) VALUES($1, $2, $3 ) RETURNING *", [email, name, new Date()])
    res.json(user.rows )
    db.query("COMMIT")
    db.query('ROLLBACK')
    // .catch(err => res.send(err.message));
    // .catch(db.query('ROLLBACK'))
  }catch(err){
    res.send(err.message)
  }
    

   
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
});

app.get('/profile/:id', async(req, res) => {
  const { id } = req.params;
  await db.query("SELECT * FROM users WHERE id = $1 ", [id])
  .then(user =>{
    if(user.rows[0]){ 
      res.json(user.rows[0])
    } else {res.status(400).json('Not found')}
  })
  .catch(err => res.status(400).json(err.message));
  // try{
  //   const { id } = req.params;
  //   const user = await db.query("SELECT * FROM users WHERE id = $1", [id]);
  //   res.json(user.rows[0])
  // }catch(err) {
  //   res.status(400).json(err.message);
  // }
});

app.put('/image', async(req, res) => {
  const { id } = req.body;
  await db.query("SELECT entries FROM users WHERE id = $1", [id])
  .then(entries => { 
    console.log(entries.rows[0].entries)
    db.query("UPDATE users SET entries = $1 WHERE id = $2",[parseInt(entries.rows[0].entries)+1, id])
    res.json('process succeeded')  
  })
  .catch(err => res.status(400).json(err.message));
  
});

app.listen('3000', () => {
  console.log('app is running on port 3000');
});
