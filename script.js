
const taskInput = document.getElementById("taskInput");
const addTask = document.getElementById("addTask");
const taskList = document.getElementById("taskList");

let tasks = [];

function updateStats() {
    const total = tasks.length;
    const completed = tasks.filter(task => task.done).length;

    const progress = total === 0
        ? 0
        : Math.round((completed / total) * 100);

    document.getElementById("total").textContent = total;
    document.getElementById("completed").textContent = completed;
    document.getElementById("progress").textContent = progress + "%";
}

function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");

        if (task.done) {
            li.classList.add("done");
        }

        const span = document.createElement("span");
        span.textContent = task.text;

        span.addEventListener("click", () => {
            tasks[index].done = !tasks[index].done;
            renderTasks();
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "DELETE";
        deleteButton.className = "delete";

        deleteButton.addEventListener("click", () => {
            tasks.splice(index, 1);
            renderTasks();
        });

        li.appendChild(span);
        li.appendChild(deleteButton);
        taskList.appendChild(li);
    });

    updateStats();
}

function createTask() {
    const text = taskInput.value.trim();

    if (text === "") {
        alert("Please enter a task!");
        return;
    }

    tasks.push({
        text: text,
        done: false
    });

    taskInput.value = "";
    renderTasks();
}

addTask.addEventListener("click", createTask);

taskInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        createTask();
    }
});

// FOCUS TIMER

let selectedMinutes = 60;
let timeLeft = selectedMinutes * 60;
let timerInterval = null;

const timerDisplay = document.getElementById("timer");

function showTime() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    timerDisplay.textContent =
        String(minutes).padStart(2, "0") + ":" +
        String(seconds).padStart(2, "0");
}

// SELECT DURATION

document.querySelectorAll(".duration").forEach(button => {
    button.addEventListener("click", () => {

        clearInterval(timerInterval);
        timerInterval = null;

        selectedMinutes = Number(button.dataset.minutes);
        timeLeft = selectedMinutes * 60;

        document.querySelectorAll(".duration").forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        showTime();
    });
});

// START TIMER

document.getElementById("startTimer").addEventListener("click", () => {

    if (timerInterval !== null) return;

    timerInterval = setInterval(() => {

        if (timeLeft > 0) {
            timeLeft--;
            showTime();
        } else {
            clearInterval(timerInterval);
            timerInterval = null;
            alert("Focus session complete! Great work!");
        }

    }, 1000);
});

// RESET TIMER

document.getElementById("resetTimer").addEventListener("click", () => {

    clearInterval(timerInterval);
    timerInterval = null;

    timeLeft = selectedMinutes * 60;

    showTime();
});

renderTasks();
showTime();
