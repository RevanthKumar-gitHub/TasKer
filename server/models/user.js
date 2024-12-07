const db = require("../utils/db");

exports.registerUser = async (user) => {
  const insertQuery = `INSERT INTO users(username,email,password) values($1,$2,$3) RETURNING *`;
  try {
    const { rows, fields } = await db.query(insertQuery, [
      user.username,
      user.email,
      user.encodedPassword,
    ]);
    return rows;
  } catch (error) {
    error.statusCode = 500;
    throw new Error(`Error at registering user : ${error.message}`);
  }
};

exports.getUserByEmail = async (email) => {
  const query = "SELECT * FROM users WHERE email = $1";
  try {
    const {rows,fields} = await db.query(query, [email]);
    return rows;
  } catch (error) {
    error.statusCode = 500;
    throw new Error(`Error at getting user :${error.message}`);
  }
};
