import { fetchTasksAPI, postTasksAPI } from "./modules/fetchAPI.js";
import { displayScrumBoard } from "./modules/utilities.js";

const taskForm = document.querySelector("#taskInputForm");

displayScrumBoard(fetchTasksAPI());

taskForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const task = document.querySelector("#taskInput").value;
  const taskType = document.querySelector("select").value;

  const newTask = {
    task: task,
    category: taskType,
    status: "to do",
    assigned: "",
  };

  let taskField = document.querySelector("#taskInput");
  taskField.value = "";

  await postTasksAPI(newTask);
  displayScrumBoard(fetchTasksAPI());
});
