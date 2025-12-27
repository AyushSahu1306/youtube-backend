import express from "express";
import { deleteVideo, dislike, getAllVideos, getMyVideos, getVideoById, like, updateVideo, uploadVideo, videosByCategory, videosByTag } from "../controllers/video.controllers.js";
import {checkAuth} from "../middleware/auth.middleware.js"

const router = express.Router();

router.post("/upload",checkAuth,uploadVideo);

router.put("/update/:id",checkAuth,updateVideo);

router.delete("/delete/:id",checkAuth,deleteVideo);

router.get("/all",getAllVideos);

router.get("/my-videos",checkAuth,getMyVideos);

router.get("/:id",checkAuth,getVideoById);

router.get("/category/:category",videosByCategory);

router.get("/tags/:tag",videosByTag);

router.post("/like",checkAuth,like);

router.post("/dislike",checkAuth,dislike);

export default router;