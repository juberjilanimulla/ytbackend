import { Router } from "express";
import controller from "./controller.js";
const router = Router();

router.get("/", controller.getStudent);
router.post("/", controller.addStudents);
router.get("/:id", controller.getStudentById);

export default router;
