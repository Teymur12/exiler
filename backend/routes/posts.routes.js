import express from "express"
import { createPost, deleteComment, getAllPosts, getFollowingsPosts, getUserPost, likeUnlikePost, newComment } from "../controllers/posts.controller.js"
import protectRoute from "../middlewares/protectRoute.js"

const router = express.Router()

router.post("/create", protectRoute, createPost)
router.get("/", protectRoute, getAllPosts)
router.post("/:id", protectRoute, newComment)
router.delete("/:id/:commentId", protectRoute, deleteComment)
router.get("/getuserpost/:id", protectRoute, getUserPost)
router.get("/getfollowingpost", protectRoute, getFollowingsPosts)
router.get("/:id", protectRoute, likeUnlikePost)

export default router
