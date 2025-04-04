import pool from "../../db.js";
import { successResponse, errorResponse } from "../../helper/serverResponse.js";
import queries from "./queries.js";

const getStudent = (req, res) => {
  pool.query(queries.getStudents, (error, results) => {
    if (error) {
      return errorResponse(res, 404, "student not found");
    }
    return successResponse(res, "successfully", results.rows);
  });
};

const getStudentById = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getStudentById, [id], (error, results) => {
    if (error) {
      return errorResponse(res, 404, "student id not found");
    }
    return successResponse(res, "successfully", results.rows);
  });
};

const addStudents = (req, res) => {
  const { name, email, age, dob } = req.body;
  if (!name || !email || !age || !dob) {
    return errorResponse(res, 400, "some params are missing");
  }
  pool.query(queries.checkEmailExists, [email], (error, results) => {
    if (results.rows.length) {
      return errorResponse(res, 404, "email already exists");
    }
    pool.query(
      queries.addStudent,
      [name, email, age, dob],
      (error, results) => {
        if (error) {
          return errorResponse(res, 400, "student not created");
        }
        return successResponse(res, "create successfully", addStudents);
      }
    );
  });
};

export default { getStudent, getStudentById, addStudents };
