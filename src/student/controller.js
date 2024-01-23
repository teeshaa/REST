const pool = require("../../db");
const queries = require("./queries");

const getStudents = (req, res) => {
  pool.query(queries.getStudents, (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

const getStudentById = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getStudentById, [id], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};
const addStudent = (req, res) => {
  const { name, email, age, dob } = req.body;
  // check if email already exists
  pool.query(queries.checkEmailExists, [email], (error, results) => {
    if (results.rows.length) {
      res.send("Email already exists");
    } else {
      pool.query(
        queries.addStudent,
        [name, email, age, dob],
        (error, results) => {
          if (error) {
            throw error;
          }
          return res.status(201).send("Student added successfully");
        }
      );
    }
  });
};

const removeStudent = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getStudentById, [id], (error, results) => {
    const noStudentFound = !results.rows.length;
    if (noStudentFound) {
      res.send("Student does not exist in the databse.");
    }
    else{
        pool.query(queries.removeStudent, [id], (error, results)=>{
            if(error){
                throw error;
            }
            res.status(200).send("Student deleted successfully");
        })
    }
  });
};

const updateStudent = (req, res) => {
    const id = parseInt(req.params.id);
    const { name } = req.body;
    pool.query(queries.getStudentById, [id], (error, results) => {
      const noStudentFound = !results.rows.length;
      if (noStudentFound) {
        res.send("Student does not exist in the databse.");
      }
      else{
          pool.query(queries.updateStudent, [name], (error, results)=>{
              if(error){
                  throw error;
              }
              res.status(200).send("Student updated successfully");
          })
      }
    }
    );
}


module.exports = {
  getStudents,
  getStudentById,
  addStudent,
  removeStudent,
  updateStudent,
};
