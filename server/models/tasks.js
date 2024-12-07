const db = require("../utils/db");

exports.createTask = async (taskInfo, user_id) => {
  const query =
    "INSERT INTO tasks(title,description,end_date,priority,status,user_id) VALUES($1,$2,$3,$4,$5,$6) RETURNING *";
  try {
    const { rows, fields } = await db.query(query, [
      taskInfo.title,
      taskInfo.description,
      taskInfo.end_date,
      taskInfo.priority,
      taskInfo.status,
      user_id,
    ]);
    return rows;
  } catch (error) {
    error.statusCode = 500;
    throw new Error(`Error at creating task :${error.message}`);
  }
};

exports.updateTask = async (taskInfo, task_id) => {
  console.log(taskInfo);

  const query =
    "UPDATE tasks SET title=$1,description = $2,end_date=$3,priority=$4,status=$5 WHERE id = $6 RETURNING *";
  try {
    const { rows, fields } = await db.query(query, [
      taskInfo.title,
      taskInfo.description,
      taskInfo.end_date,
      taskInfo.priority,
      taskInfo.status,
      task_id,
    ]);
    return rows;
  } catch (error) {
    error.statusCode = 500;
    throw new Error(`Error at updating task :${error.message}`);
  }
};

exports.getTaskDetailsById = async (id) => {
  try {
    const query = "SELECT * FROM tasks WHERE id = $1";
    const { rows, fields } = await db.query(query, [id]);
    return rows;
  } catch (error) {
    error.statusCode = 500;
    throw new Error(`Error at getting task :${error.message}`);
  }
};

exports.getAllTaskDetails = async (id) => {
  try {
    const query = "SELECT * FROM tasks";
    const { rows, fields } = await db.query(query);
    return rows;
  } catch (error) {
    error.statusCode = 500;
    throw new Error(`Error at getting tasks :${error.message}`);
  }
};

exports.deleteTask = async (id) => {
  try {
    const query = "DELETE FROM tasks WHERE id= $1 RETURNING *";
    const { rows, fields } = await db.query(query,[id]);
    return rows;
  } catch (error) {
    error.statusCode = 500;
    throw new Error(`Error at deleting task :${error.message}`);
  }
};
