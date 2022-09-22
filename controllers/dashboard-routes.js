const router = require("express").Router();
const { Post, Comment, User, ScorePost } = require("../models");
const withAuth = require("../utils/auth");

// GET /dashboard (All Posts)
router.get("/", async (req, res) => {
  const sequelizeOptions = {
    where: {
      user_id: req.session.user_id,
    },
    attributes: ["id", "title", "post_body", "user_id", "created_at"],
    include: [
      {
        model: User,
        attributes: ["username"],
      },
      {
        model: Comment,
        attributes: ["id", "content", "post_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
    ],
  };
  // GET /dashboard (for highscore)
  const sequelizeOptions1 = {
    where: {
      user_id: req.session.user_id,
    },
    attributes: ["id", "highscore", "user_id", "created_at"],
    include: [
      {
        model: User,
        attributes: ["username"],
      },
    ],
  };

  try {
    // User posts
    const allPosts = await Post.findAll(sequelizeOptions);
    const posts = allPosts.map((post) => post.get({ plain: true }));
    // High Score posts
    const allScoreposts = await ScorePost.findAll(sequelizeOptions1);
    const scoreposts = allScoreposts.map((scorepost) =>
      scorepost.get({ plain: true })
    );
    res.render("dashboard", { scoreposts, posts, loggedIn: true });
  } catch (err) {
    console.log(err);
    res.status(400).send({ err });
  }
});

// GET /dashboard/edit/:id
router.get("/edit/:id", withAuth, (req, res) => {
  Post.findByPk(req.params.id, {
    attributes: ["id", "title", "post_body", "created_at"],
    include: [
      {
        model: User,
        attributes: ["username"],
      },
      {
        model: Comment,
        attributes: ["id", "content", "post_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
    ],
  })
    .then((dbPostData) => {
      if (dbPostData) {
        const post = dbPostData.get({ plain: true });
        res.render("edit-post", {
          post,
          loggedIn: true,
        });
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
