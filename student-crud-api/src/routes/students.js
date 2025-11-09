import { Router } from "express";
import {
  createStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
} from "../controllers/studentsController.js";

const router = Router();

router.post("/", createStudent);        // Create
router.get("/", getStudents);           // Read (list with search/pagination)
router.get("/:id", getStudentById);     // Read (single)
router.put("/:id", updateStudent);      // Update (full)
router.patch("/:id", updateStudent);    // Update (partial)
router.delete("/:id", deleteStudent);   // Delete

export default router;
