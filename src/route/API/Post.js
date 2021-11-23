const express = require("express");
const router = express.Router();
const checkUser = require("../../app/middlewares/checkUser");
const PostController = require("../../app/controllers/PostController");
const multer = require("multer");

router.post("/create", checkUser, multer({ dest: "uploads/" }).single("image"),PostController.createNewPost);
router.post("/:id/update", checkUser, multer({ dest: "uploads/" }).single("image"), PostController.updatePost);
router.delete("/:id/delete", checkUser, PostController.deletePost);
router.get("/page/:id", PostController.getPosts);


module.exports = router;
