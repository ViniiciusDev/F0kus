// Constantes Formulário
const addTaskBtn = document.querySelector(".app__button--add-task");
const formAddTask = document.querySelector(".app__form-add-task");
const textarea = document.querySelector(".app__form-textarea");
const ulTasks = document.querySelector(".app__section-task-list");
const cancelBtn = document.querySelector(".app__form-footer__button--cancel");
const taskActiveDescription = document.querySelector(
    ".app__section-active-task-description"
);

const removeCompleteTaskBtn = document.querySelector("#btn-remover-concluidas");
const removeAllTaskBtn = document.querySelector("#btn-remover-todas");

// Constante que pega os itens salvos no localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let selectedTask = null;
let liSelectedTask = null;
// Método que transformar as tasks em itens no localStorage com stringify
function editContentLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
// Método que cria o elementos task
function createElementTask(task) {
    // Criação do LI
    const li = document.createElement("li");
    li.classList.add("app__section-task-list-item");
    // Criação do SVG
    const svg = document.createElement("svg");
    svg.innerHTML = ` <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
                            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
                    </svg>`;
    // Criação do Paragrafo
    const paragraph = document.createElement("p");
    // Valor salvo no localStorage e passado para o paragrafo
    paragraph.textContent = task.descricao;
    paragraph.classList.add("app__section-task-list-item-description");
    // Criação do btn
    const btn = document.createElement("button");
    btn.classList.add("app_button-edit");
    // Evento de click que permite a alteração da task salva.
    btn.onclick = () => {
        // debugger
        const newTask = prompt("Digite sua alteração");
        // console.log("New Task Description: ", newTask);
        if (newTask) {
            paragraph.textContent = newTask;
            task.descricao = newTask;
            editContentLocalStorage();
        }
    };
    // Criação do elemento img
    const img = document.createElement("img");
    img.setAttribute("src", "/imagens/edit.png");
    // Todos os appends
    btn.append(img);
    li.append(svg);
    li.append(paragraph);
    li.append(btn);
    if (task.complete) {
        // Complementado a verificação do evento endedFocus, criamos a condição que se for complete, em li adicionamos a class complete e o btn será desativado.
        li.classList.add("app__section-task-list-item-complete");
        btn.setAttribute("disabled", "disabled");
    } else {
        // Caso contrário será chamado o método li.onclick.
        // Seleção de tarefas
        li.onclick = () => {
            // debugger;
            document
                .querySelectorAll(".app__section-task-list-item-active")
                .forEach((element) => {
                    element.classList.remove(
                        "app__section-task-list-item-active"
                    );
                });
            if (selectedTask == task) {
                taskActiveDescription.textContent = "";
                selectedTask = null;
                liSelectedTask = null;
                return;
            }
            selectedTask = task;
            liSelectedTask = li;
            taskActiveDescription.textContent = task.descricao;
            li.classList.add("app__section-task-list-item-active");
        };
    }
    // Return que irá retornar o inteiro item
    return li;
}
// Método que realiza a limpeza do conteudo do form quando clicar em cancel.
function cancelContent() {
    textarea.value = "";
    formAddTask.classList.add("hidden");
}
// Evento que mostra e esconde o form de criação de task
addTaskBtn.addEventListener("click", () => {
    formAddTask.classList.toggle("hidden");
});
// Evento que irá criar o elemento task, enviar ao localStorage e mostrar na tela.
formAddTask.addEventListener("submit", (event) => {
    event.preventDefault();
    const task = {
        descricao: textarea.value,
    };
    tasks.push(task);
    const elementTask = createElementTask(task);
    ulTasks.append(elementTask);
    editContentLocalStorage();
    cancelContent();
});
// Evento que usa o metodo de cancelar no botão cancel
cancelBtn.addEventListener("click", () => {
    cancelContent();
});
// Ciclo foreach que para cada task cria um elementTask e append ele no ul, mostrando assim os elementos no html.
tasks.forEach((task) => {
    const elementTask = createElementTask(task);
    ulTasks.append(elementTask);
});

document.addEventListener("endedFocus", () => {
    if (selectedTask && liSelectedTask) {
        // A condição é criada para que quando tivermos selected task && liSelectedTask, ele remova a class active e adicione a complete.
        liSelectedTask.classList.remove("app__section-task-list-item-active");
        liSelectedTask.classList.add("app__section-task-list-item-complete");
        // E pegue em li o elemento button e adicione nele os atributos disabled disabled
        liSelectedTask
            .querySelector("button")
            .setAttribute("disabled", "disabled");
        // Esse booleano vem criado para conseguirmos identificar que a selected task.complete sejá = true (verdadeira)
        selectedTask.complete = true;
        // E assim atualizamos a localStorage.
        editContentLocalStorage();
    }
});

const removeTasks = (onlyComplete) => {
    const selector = onlyComplete
        ? ".app__section-task-list-item-complete"
        : ".app__section-task-list-item";
    document.querySelectorAll(selector).forEach((element) => {
        element.remove();
    });
    tasks = onlyComplete ? tasks.filter((task) => !task.complete) : [];
    editContentLocalStorage();
};

removeCompleteTaskBtn.onclick = () => removeTasks(true);
removeAllTaskBtn.onclick = () => removeTasks(false);
