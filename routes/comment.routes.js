import express from "express";
import { checkAuth } from "../middleware/auth.middleware.js";
import { deleteComment, getCommentByVideo, newComment, updateComment } from "../controllers/comment.controller.js";

const router = express.Router();

router.post("/new",checkAuth,newComment);

router.delete("/:commentId",checkAuth,deleteComment);

router.put("/:commentId",checkAuth,updateComment);

router.get("/:videoId",checkAuth,getCommentByVideo);

export default router;