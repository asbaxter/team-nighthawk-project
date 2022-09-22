const router = require("express").Router();

const userRoutes = require("./user-routes");
const postRoutes = require("./post-routes");
const postscoreRoutes = require("./post-score-route");
const commentRoutes = require("./comment-routes");

router.use("/users", userRoutes);
router.use("/posts", postRoutes);
router.use("/scores", postscoreRoutes);
router.use("/comments", commentRoutes);

router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;
