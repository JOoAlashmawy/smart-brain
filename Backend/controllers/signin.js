const handleSignin = async(req, res, db, bcrypt) => {
    try{
      const {email, password} = req.body
      if(!email || !password) {
        return res.status(400).json('incorrect form submission')
    }
      const data = await db.query("SELECT email, hash FROM login WHERE email = $1", [email])
      if(bcrypt.compareSync(password, data.rows[0].hash)){
        const user = await db.query("SELECT * FROM users WHERE email = $1", [email])
        res.json(user.rows)
      }else{
        res.status(400).json('wrong credentials')
      }
    }catch(err){
      res.status(400).send(err.message)
    }
}
module.exports = {
      handleSignin: handleSignin
  }