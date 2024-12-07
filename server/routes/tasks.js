const router = require("express").Router();
const taskController = require("../controllers/tasks");
const {auth} = require("../utils/auth");

router.post("/createTask",auth,taskController.createTask);
router.put("/updateTask/:id",auth,taskController.updateTask);
router.get("/allTasks",auth,taskController.getAllTasks);
router.delete("/deleteTask/:id",auth,taskController.deleteTask);

module.exports = router;