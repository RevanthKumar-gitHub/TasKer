const { Pool } = require("pg");
const dotenv = require("dotenv").config();

const pool = new Pool({
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
});

const query = (text,params)=> pool.query(text,params);

module.exports = {query};