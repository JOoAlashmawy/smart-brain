const handleProfileGet = async(req, res,db) => {
    const { id } = req.params;
    await db.query("SELECT * FROM users WHERE id = $1 ", [id])
    .then(user =>{
      if(user.rows[0]){ 
        res.json(user.rows[0])
      } else {res.status(400).json('Not found')}
    })
    .catch(err => res.status(400).json(err.message));
  };
module.exports = {
    handleProfileGet: handleProfileGet
}