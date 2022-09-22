const { Post } = require("../models");

const postData = [
  {
    title: "Consectetur adipiscing elit",
    post_body:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    user_id: 1,
  },
  {
    title: "Consectetur adipiscing elit",
    post_body:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    user_id: 2,
  },
  {
    title: "Consectetur adipiscing elit",
    post_body:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    user_id: 3,
  },
  {
    title: "Consectetur adipiscing elit",
    post_body:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    user_id: 4,
  },
];

const seedPost = () => Post.bulkCreate(postData);

module.exports = seedPost;
