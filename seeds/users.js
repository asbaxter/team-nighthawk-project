const { User } = require("../models");

const userdata = [
  {
    username: "ALuck12",
    email: "andrew.luck@colt.com",
    password: "password123",
  },
  {
    username: "Peyton18",
    email: "pmanning@broncos.com",
    password: "password123",
  },
  {
    username: "GRamsay",
    email: "theironchef@foodnetwork.com",
    password: "password123",
  },
  {
    username: "bobbyFlay",
    email: "beatBobbyFlay@foodnetwork.com",
    password: "password123",
  },
  {
    username: "guyFieri",
    email: "bowlingShirts@foodnetwork.com",
    password: "password123",
  },
  {
    username: "RingoStarr",
    email: "beatlesboy@aol.com",
    password: "password123",
  },
  {
    username: "BieberFever",
    email: "bieberfan69@gmail.com",
    password: "password123",
  },
  {
    username: "buzzlightyear",
    email: "toysWillBeToys@aim.com",
    password: "password123",
  },
  {
    username: "spongebob_circle_pants",
    email: "alternateSponge@yahoo.com",
    password: "password123",
  },
  {
    username: "patrickStar",
    email: "rockLiving@nickelodeon.com",
    password: "password123",
  },
];


const seedUsers = () => User.bulkCreate(userdata, {individualHooks: true});

module.exports = seedUsers;

