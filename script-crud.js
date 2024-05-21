const formAddTask = document.querySelector(".app__form-add-task");
const addTaskBtn = document.querySelector(".app__button--add-task");

let tarefas = [];

addTaskBtn.addEventListener("click", () => {
    formAddTask.classList.toggle("hidden");
});

formAddTask.addEventListener("submit", (event) => {
    event.preventDefault();
    const textarea = document.querySelector(".app__form-textarea");
    const task = {
        descricao: textarea.value,
    };
    tarefas.push(task);
    localStorage.setItem("Tasks", JSON.stringify(tarefas));
});
