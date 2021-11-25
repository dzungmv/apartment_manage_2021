const express = require("express");
const router = express.Router();
const checkUser = require("../../app/middlewares/checkUser");
const PostController = require("../../app/controllers/PostController");
const multer = require("multer");

router.post("/create", checkUser, multer({ dest: "../../public/images/uploads", }).single("image"), PostController.createNewPost);
router.post("/:id/update", checkUser, multer({ dest: "../../public/images/uploads/" }).single("image"), PostController.updatePost);
router.delete("/:id", checkUser, PostController.deletePost);
router.get("/page/:id", PostController.getPosts);


module.exports = router;
