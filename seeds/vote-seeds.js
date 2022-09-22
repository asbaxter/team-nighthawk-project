const { Vote } = require("../models");

const votedata = [
  {
    user_id: 9,
    post_id: 3,
  },
  {
    user_id: 1,
    post_id: 7,
  },
  {
    user_id: 8,
    post_id: 2,
  },
  {
    user_id: 8,
    post_id: 1,
  },
  {
    user_id: 9,
    post_id: 5,
  },
  {
    user_id: 3,
    post_id: 5,
  },
  {
    user_id: 4,
    post_id: 1,
  },
  {
    user_id: 10,
    post_id: 4,
  },
  {
    user_id: 3,
    post_id: 2,
  },
  {
    user_id: 9,
    post_id: 3,
  },
];

const seedVotes = () => Vote.bulkCreate(votedata);

module.exports = seedVotes;
