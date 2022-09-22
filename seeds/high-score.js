const {ScorePost} = require('../models');

  const scoredata = [
    {
        highscore: 100,
        user_id: 1,
    },
    {
        highscore: 120,
        user_id: 2,
    },
    {
        highscore: 95,
        user_id: 3,
    }
  ]
  


const seedHighScores = () => ScorePost.bulkCreate(scoredata, {individualHooks: true});

module.exports = seedHighScores;

