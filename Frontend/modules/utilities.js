import { fetchTasksAPI, deleteTaskAPI, patchTaskAPI } from "./fetchAPI.js";

function createScrumBoard({ task, category, status, assigned, id }) {
  const createDiv = document.createElement("div");
  const createTaskP = document.createElement("p");
  const createInputButton = document.createElement("input");

  createDiv.classList.add("scrumBoardCard", `${category}Color`);
  createTaskP.innerText = task;
  createInputButton.type = "submit";
  createInputButton.id = `${id}InputButton`;

  if (status === "to do") {
    const toDo = document.querySelector("#toDo");
    const createForm = document.createElement("form");
    const createInputField = document.createElement("input");

    createForm.id = `${id}Form`;
    createInputField.type = "text";
    createInputField.placeholder = "Enter name";
    createInputField.required = true;
    createInputField.id = `${id}InputField`;
    createInputButton.value = "Assign >>";

    createForm.append(createInputField, createInputButton);
    createDiv.append(createTaskP, createForm);
    toDo.append(createDiv);

    addToDoEventListener(id);
  } else if (status === "in progress") {
    const inProgress = document.querySelector("#inProgress");
    const createAssignedP = document.createElement("p");

    createAssignedP.innerText = `-${assigned}`;
    createInputButton.value = "Done >>";

    createDiv.append(createTaskP, createAssignedP, createInputButton);
    inProgress.append(createDiv);

    addInProgressEventListener(assigned, id);
  } else if (status === "done") {
    const done = document.querySelector("#done");
    const createAssignedP = document.createElement("p");

    createAssignedP.innerText = `-${assigned}`;
    createInputButton.value = "Remove X";

    createDiv.append(createTaskP, createAssignedP, createInputButton);
    done.append(createDiv);

    addDoneEventListener(id);
  }
}

function addToDoEventListener(id) {
  const form = document.getElementById(`${id}Form`);
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const inputField = document.getElementById(`${id}InputField`);
    const patchInfo = {
      status: "in progress",
      assigned: inputField.value,
    };

    await patchTaskAPI(patchInfo, id);
    displayScrumBoard(fetchTasksAPI());
  });
}

function addInProgressEventListener(assigned, id) {
  const inputButton = document.getElementById(`${id}InputButton`);
  inputButton.addEventListener("click", async (event) => {
    const patchInfo = {
      status: "done",
      assigned: assigned,
    };
    await patchTaskAPI(patchInfo, id);
    displayScrumBoard(fetchTasksAPI());
  });
}

function addDoneEventListener(id) {
  const inputButton = document.getElementById(`${id}InputButton`);
  inputButton.addEventListener("click", async (event) => {
    await deleteTaskAPI(id);
    displayScrumBoard(fetchTasksAPI());
  });
}

export async function displayScrumBoard(object) {
  const toDo = document.querySelector("#toDo");
  const inProgress = document.querySelector("#inProgress");
  const done = document.querySelector("#done");
  const taskObject = await object;

  toDo.innerHTML = "";
  inProgress.innerHTML = "";
  done.innerHTML = "";

  taskObject.forEach((task) => {
    createScrumBoard(task);
  });
}
