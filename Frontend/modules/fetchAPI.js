export async function fetchTasksAPI() {
  const url = "http://localhost:3000/tasks";

  const res = await fetch(url);
  const tasks = await res.json();
  return tasks;
}

export async function postTasksAPI(addTask) {
  const url = "http://localhost:3000/tasks";

  const option = {
    method: "POST",
    body: JSON.stringify(addTask),
    headers: {
      "Content-type": "application/json",
    },
  };

  const res = await fetch(url, option);
  const task = await res.json();
  return task;
}

export async function patchTaskAPI(patchTask, id) {
  const url = `http://localhost:3000/tasks?id=${id}`;

  const option = {
    method: "PATCH",
    body: JSON.stringify(patchTask),
    headers: {
      "Content-type": "application/json",
    },
  };

  const res = await fetch(url, option);
  const task = await res.json();
  return task;
}

export async function deleteTaskAPI(id) {
  const url = `http://localhost:3000/tasks?id=${id}`;

  const option = {
    method: "DELETE",
  };

  const res = await fetch(url, option);
  const task = await res.json();
  return task;
}
