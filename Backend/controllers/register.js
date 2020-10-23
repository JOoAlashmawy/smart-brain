const handleRegister = (db, bcrypt) => async (req, res) =>{
    try{  
      const { email, name, password } = req.body;
      if(!email || !name || !password) {
          return res.status(400).json('incorrect form submission')
      }
      const hash = bcrypt.hashSync(password);
      console.log(hash);
      await db.query("BEGIN") //startign transaction 
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
};

module.exports = {
    handleRegister: handleRegister
};