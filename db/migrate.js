import { readFileSync } from "fs";
import { sequelize } from "./index.js";
import { Student } from "../models/student.js";

const migrate = async () => {
  try {
    // Read students data from JSON file
    const students = JSON.parse(readFileSync("../data/students.json", "utf8"));

    // Sync the database (creates tables if they don't exist)
    await sequelize.sync();

    // Insert data into the database
    for (const studentData of students) {
      await Student.create(studentData);
    }

    console.log("Data migration completed successfully");
  } catch (error) {
    console.error("Error during data migration:", error);
  } finally {
    await sequelize.close();
  }
};

migrate();
