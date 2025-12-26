import express from "express";
import { updateVideo, uploadVideo } from "../controllers/video.controllers.js";
import {checkAuth} from "../middleware/auth.middleware.js"

const router = express.Router();

router.post("/upload",checkAuth,uploadVideo);

router.put("/update/:id",checkAuth,updateVideo);

export default router;