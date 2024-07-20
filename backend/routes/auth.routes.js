import express from "express"

import { followUser, updateProfile } from "../controllers/auth.contoller.js"

import { logout, signin, signup } from "../controllers/auth.contoller.js"
import protectRoute from "../middlewares/protectRoute.js"
import  upload  from '../middlewares/uploadImg.js';


const router = express.Router()


router.post("/signin", signin)

router.post("/signup", signup)

router.post("/follow/:id", protectRoute, followUser)

router.put('/profile', protectRoute, upload.single('profilePic'), updateProfile);


router.post("/logout", logout)

export default router