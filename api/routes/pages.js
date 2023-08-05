import express from "express";
import { getPages, addPage, updatePage, deletePage } from "../controllers/page.js";

const router = express.Router()
router.get("/", getPages);
router.post("/", addPage);
router.put("/:id", updatePage);
router.delete("/:id", deletePage);

export default router;