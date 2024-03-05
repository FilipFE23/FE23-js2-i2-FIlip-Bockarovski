import fs from "fs/promises";

async function readDB() {
  const raw = await fs.readFile("./src/taskdb.json");
  const db = await JSON.parse(raw);
  return db;
}

async function writeDB(db) {
  const newDB = JSON.stringify(db, null, 2);
  await fs.writeFile("./src/taskdb.json", newDB);
}

async function getTasks() {
  const tasks = await readDB();
  return tasks;
}

async function addTask(newTask) {
  newTask.id = Date.now();
  let tasks = await getTasks();
  tasks.push(newTask);
  await writeDB(tasks);
  return tasks;
}

async function patchTask(objectId, patchInfo) {
  const tasks = await getTasks();
  const id = Number(objectId.id);

  for (const task of tasks) {
    if (id === task.id && task.assigned === patchInfo.assigned) {
      task.status = patchInfo.status;
      const patchedDataBase = tasks;
      await writeDB(patchedDataBase);
    } else if (id === task.id) {
      task.status = patchInfo.status;
      task.assigned = patchInfo.assigned;
      const patchedDataBase = tasks;
      await writeDB(patchedDataBase);
    }
  }
  return tasks;
}

async function deleteTask(objectId) {
  const tasks = await getTasks();
  const taskId = Number(objectId);

  const index = tasks.findIndex((task) => task.id === taskId);

  if (index !== -1) {
    tasks.splice(index, 1);
    await writeDB(tasks);
  }
  return { tasks };
}

export { getTasks, addTask, patchTask, deleteTask };
