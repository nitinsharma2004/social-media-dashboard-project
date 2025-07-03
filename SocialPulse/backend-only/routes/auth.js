import express from "express";
import { signup,signin, googlesignin, googlecallback, facebooksignin, facebookcallback, updateprofile, updatepassword, deleteaccount, updateprofiledata} from "../controllers/auth.js";
import { verifyToken } from "../Middleware/verifyToken.js";
import upload from "../utils/mult.js"
const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.put("/updateprofile",upload.single("image"),verifyToken,updateprofile );
router.put("/updateprofiledata",verifyToken,updateprofiledata );
router.put("/updatepassword",verifyToken, updatepassword);
router.delete("/deleteaccount", verifyToken, deleteaccount);
router.get("/google", googlesignin);
router.get("/google/callback",googlecallback );
router.get("/facebook", facebooksignin);
router.get("/facebook/callback",facebookcallback );

export default router;