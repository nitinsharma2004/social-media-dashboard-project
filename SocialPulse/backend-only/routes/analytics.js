import express from "express";
import {facebookanalytics, youtubeanalytics} from "../controllers/auth.js";


const router = express.Router();

router.get("/youtube",youtubeanalytics);
router.get("/facebook",facebookanalytics);



export default router;