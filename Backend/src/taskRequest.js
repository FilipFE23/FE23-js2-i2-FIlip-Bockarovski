import express from "express";
import cors from "cors";
import { body, validationResult } from "express-validator";
import { getTasks, addTask, patchTask, deleteTask } from "./handledb.js";

const app = express();

const postValidations = [
  body("task").exists().isString(),
  body("category").exists().isIn(["ux", "devBackend", "devFrontend"]),
  body("status").exists().isIn(["to do"]),
  body("assigned").exists().isString(),
];

const patchValidation = [
  body("status").exists().isIn(["in progress", "done"]),
  body("assigned").exists().isString(),
];

app.use(cors());
app.use(express.json());

app.get("/tasks", async (req, res) => {
  const tasks = await getTasks();
  res.json(tasks);
});

app.post("/tasks", postValidations, async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ message: "Wrong task structure" });
  }

  await addTask(req.body);
  res.json(req.body);
});

app.patch("/tasks", patchValidation, async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ message: "Wrong task structure" });
  }

  await patchTask(req.query, req.body);
  res.json({ Message: "Patch successful" });
});

app.delete("/tasks", async (req, res) => {
  await deleteTask(req.query.id);
  res.json({ message: "Task removed" });
});

export { app };
