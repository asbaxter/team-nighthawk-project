const seedUsers = require('./users');
const seedPost = require("./post");
const seedHighScores = require("./high-score")

const sequelize = require('../config/connection');

const seedAll = async () => {
    await sequelize.sync({ force: true });
    await seedUsers();
    await seedPost();
    await seedHighScores();
  
    process.exit(0);
  };
  
  seedAll();
