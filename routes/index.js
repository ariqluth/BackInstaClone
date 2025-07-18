import express from "express";
const router = express.Router();

router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

// Dashboard
router.get("/dashboard", function (req, res, next) {
  res.render("dashboard", { title: "Dashboard" });
});

// Login
router.get("/login", function (req, res, next) {
  res.render("login", { title: "Login" });
});

router.post("/login", function (req, res, next) {
  res.redirect("/dashboard");
});

// Logout
router.get("/logout", function (req, res, next) {
  res.redirect("/login");
});

// post
router.get("/post", function (req, res, next) {
  res.render("post", { title: "Post" });
});

// like
router.get("/like", function (req, res, next) {
  res.render("like", { title: "Like" });
});

// comment
router.get("/comment", function (req, res, next) {
  res.render("comment", { title: "Comment" });
});

// user
router.get("/user", function (req, res, next) {
  res.render("user", { title: "User" });
});

// story
router.get("/story", function (req, res, next) {
  res.render("story", { title: "Story" });
});

// storyview
router.get("/storyview", function (req, res, next) {
  res.render("storyview", { title: "Story View" });
});

module.exports = router;
