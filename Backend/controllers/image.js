const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '4af00e5ec17d4c98abae6f7e031018c2',
});
  
const handleApiCall = (req, res) => {
    app.models
        .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => {
            res.json(data);
        })
        .catch(err => res.status(400).json('inable to work with API'))
}

const handleImage = async(req, res, db) => {
    const { id } = req.body;
    await db.query("SELECT entries FROM users WHERE id = $1", [id])
    .then(entries => { 
      console.log(entries.rows[0].entries)
      db.query("UPDATE users SET entries = $1 WHERE id = $2",[parseInt(entries.rows[0].entries)+1, id])
      res.json('process succeeded')  
    })
    .catch(err => res.status(400).json(err.message));
    
};
module.exports = {
    handleImage,
    handleApiCall
}
