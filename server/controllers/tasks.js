const { asyncHandler } = require("../utils/handlers");
const taskModel = require("../models/tasks");

exports.createTask = asyncHandler(async (req, res, next) => {
  const { title, description, end_date, priority, status } = req.body;

  if (!title || !description || !end_date || !priority || !status) {
    res.status(400);
    throw new Error("Please provide all required details");
  }

  const user_id = req.user.id;

  const results = await taskModel.createTask(req.body, user_id);
  if (results.length > 0) {
    res.status(201).json({
      success: true,
      message: "Task Added",
    });
  }
});

exports.updateTask = asyncHandler(async (req, res, next) => {
  const task_id = req.params.id;

  const taskDetails = await taskModel.getTaskDetailsById(task_id);
  if (taskDetails.length == 0) {
    res.status(400);
    throw new Error("Task doesnot exists");
  }
  if (taskDetails[0].user_id != req.user.id) {
    res.status(403);
    throw new Error("Unauthorized access");
  }

  let { title, description, end_date, priority, status } = req.body;

  if (!title) {
    title = taskDetails[0].title;
  }
  if (!description) {
    description = taskDetails[0].description;
  }
  if (!end_date) {
    end_date = taskDetails[0].end_date;
  }
  if (!status) {
    status = taskDetails[0].status;
  }
  if (!priority) {
    priority = taskDetails[0].priority;
  }

  const results = await taskModel.updateTask(
    { title, description, end_date, status, priority },
    task_id
  );
  if (results.length > 0) {
    res.status(201).json({
      success: true,
      message: "Task updated",
    });
  }
});

exports.getAllTasks = asyncHandler(async (req, res, next) => {
  const results = await taskModel.getAllTaskDetails();
  if (results.length > 0) {
    res.status(201).json({
      success: true,
      data: results,
    });
  }
});

exports.deleteTask = asyncHandler(async (req, res, next) => {
  const task_id = req.params.id;

  const taskDetails = await taskModel.getTaskDetailsById(task_id);
  if (taskDetails.length == 0) {
    res.status(400);
    throw new Error("Task doesnot exists");
  }
  if (taskDetails[0].user_id != req.user.id) {
    res.status(403);
    throw new Error("Unauthorized access");
  }
  const results = await taskModel.deleteTask(task_id);
  if (results.length > 0) {
    res.status(201).json({
      success: true,
      message: "Task deleted",
    });
  }
});
