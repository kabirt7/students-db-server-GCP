import { Sequelize } from "sequelize";
import { sequelize } from "../db/index.js";

export const Student = sequelize.define(
  //
  "student",
  {
    // SETTING UP COLUMNS
    // - PRIMARY KEY
    // - COLUMN TYPES
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    first_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    last_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    house: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  // RENAMING THE AUTO GENERATED COLUMNS
  {
    updatedAt: "updated_at",
    createdAt: "created_at",
  }
);
