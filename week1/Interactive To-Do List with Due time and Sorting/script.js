const form = document.getElementById("add-form");
const editTaskContainer = document.getElementById("edit-task");
const editForm = document.getElementById("edit-form");
const cancelBtn = document.getElementById("cancel-btn");
const overlay = document.getElementById("overlay");

const tasks = [];

let taskId;

/**
 * Function to render tasks to the DOM
 * @description This function renders all the tasks in the tasks array to the DOM
 * @param {Array} tasks The array of tasks to render
 */
const renderTasks = () => {
    const taskContainer = document.getElementById("task-container");
    taskContainer.innerHTML = ""; // Clear the task list before rendering

    tasks.forEach((task, index) => {
        const taskItem = document.createElement("div");
        taskItem.classList.add("task-item");

        // Truncate description and show "Read More" if necessary
        let truncatedDescription = task.description || "No description";
        let isLongDescription = truncatedDescription.length > 45;
        if (isLongDescription) {
            truncatedDescription = truncatedDescription.slice(0, 45) + "...";
        }

        // Use a conditional to check if the description is too long and show the "Read More" button accordingly
        let readMoreButton = "";
        if (isLongDescription) {
            readMoreButton = `
            <button class="read-more">${
                task.read ? "Read Less" : "Read More"
            }</button>
        `;
        }
        
        taskItem.innerHTML = `
        <h3>${task.title}</h3>
        <p class="description">
            ${task.read ? task.description : truncatedDescription}
        </p>
        ${readMoreButton}
        <p class="date"><strong>Due Date:</strong> ${new Date(
            task.dueDate
        ).toLocaleDateString()}</p>
        <p class="status">${task.completed ? "completed" : "pending"}</p>
        <button class="edit-btn" ${
            task.completed ? "disabled" : ""
        }>Edit</button>
        <button class="delete-btn">Delete</button>
        <button class="complete-btn">${
            task.completed ? "Undo" : "Complete"
        }</button>
    `;

        // Get the buttons from the newly created task item
        const readMoreButtonElement = taskItem.querySelector(".read-more");
        const editButton = taskItem.querySelector(".edit-btn");
        const deleteButton = taskItem.querySelector(".delete-btn");
        const completeButton = taskItem.querySelector(".complete-btn");
        const status = taskItem.querySelector(".status");
        const description = taskItem.querySelector(".description");

        // Add event listener for Read More / Read Less button
        if (readMoreButtonElement) {
            readMoreButtonElement.addEventListener("click", () => {
                task.read = !task.read; // Toggle the read status
                renderTasks(); // Re-render to update the description display
            });
        }

        // Change status styles if completed
        if (task.completed) {
            status.style.color = "#259b30";
            status.style.background = "#dafcdd";
            status.style.borderColor = "#259b30";
        }

        // Attach event listeners to other buttons
        editButton.addEventListener("click", () => {
            editTaskContainer.classList.add("active");
            editTask(task.id);
        });
        deleteButton.addEventListener("click", () => deleteTask(task.id));
        completeButton.addEventListener("click", () => toggleCompleteTask(task.id));

        taskContainer.appendChild(taskItem);
    });
};

/**
 * Add a new task to the list of tasks
 * @param {Event} event - The event that triggered the function
 */
const addTask = (event) => {
    event.preventDefault(); // Prevent the form from submitting and reloading the page
    const title = document.getElementById("task-title").value;
    const description = document.getElementById("task-description").value;
    const dueDate = document.getElementById("task-due-date").value;
    if (title && dueDate) {
        const newTask = {
            /**
             * The title of the task
             * @type {string}
             */
            title,
            /**
             * The description of the task
             * @type {string}
             */
            description,
            /**
             * The due date of the task
             * @type {Date}
             */
            dueDate: new Date(dueDate),
            /**
             * Whether the task is completed or not
             * @type {boolean}
             */
            completed: false,
            /**
             * A unique identifier for the task
             * @type {string}
             */
            id: Math.random().toString(36).substr(2, 9), // Generate a unique ID for the task
        };

        tasks.push(newTask);

        renderTasks();
        resetForm();
    } else {
        alert("Please provide a title and due date for the task.");
    }
};

/**
 * Delete a task from the tasks array by index
 * @param {number} id - The id of the task to be deleted
 */
const deleteTask = (id) => {
    const index = tasks.findIndex((item) => item.id === id);
    // Remove the task from the tasks array
    tasks.splice(index, 1);

    // Re-render the tasks to the DOM
    renderTasks();
};

/**
 * Edit a task
 * @param {string} id - The id of the task to be edited
 */
const editTask = (id) => {
    const task = tasks.find((item) => item.id === id);
    if (task) {
        // Set the values of the edit form to the values of the selected task
        document.getElementById("edit-title").value = task.title;
        document.getElementById("edit-description").value = task.description;
        // Set the due date of the edit form to the due date of the selected task
        // in the ISO format "YYYY-MM-DD"
        document.getElementById("edit-due-date").value = task.dueDate
            .toISOString()
            .slice(0, 10);

        // Store the id of the selected task in a variable
        taskId = id;
    }
};

/**
 * Update a task in the tasks array
 * @param {Event} e - The event that triggered the function
 * @description Prevents the form from submitting and reloading the page.
 *              Gets the values of the edit form and updates the
 *              corresponding task in the tasks array.
 *              Removes the active class from the edit task container.
 *              Re-renders the tasks to the DOM.
 */
const updateTask = (e) => {
    e.preventDefault(); // Prevent the form from submitting and reloading the page
    const title = document.getElementById("edit-title").value;
    const description = document.getElementById("edit-description").value;
    const dueDate = document.getElementById("edit-due-date").value;
    if (title && dueDate) {
        tasks.forEach((task) => {
            if (task.id === taskId) {
                task.title = title;
                task.description = description;
                task.dueDate = new Date(dueDate);
            }
        });
        taskId = null;
        editTaskContainer.classList.remove("active");
        renderTasks();
    } else {
        alert("Please provide a title and due date for the task.");
    }
};

/**
 * Toggle a task as completed or uncompleted
 * @param {string} id - The id of the task to toggle
 * @description Toggles the task with the given id as completed or uncompleted
 *              in the tasks array. If the taskId variable is null and the
 *              add task button text is "update", resets the form. Re-renders
 *              the tasks to the DOM.
 */
const toggleCompleteTask = (id) => {
    tasks.forEach((task) => {
        if (task.id === id) {
            task.completed = !task.completed;
            return task;
        }
    });

    taskId = null;

    const addTaskBtn = document.getElementById("add-task-btn");
    if (taskId === null && addTaskBtn.textContent === "update") {
        resetForm();
    }
    renderTasks();
};
// Reset the form

/**
 * Resets the form to its default state
 * @description Resets the form to its default state. Sets the title, description
 *              and due date fields to empty strings. Sets the add task button
 *              text to "Add task".
 */
const resetForm = () => {
    document.getElementById("task-title").value = "";
    document.getElementById("task-description").value = "";
    document.getElementById("task-due-date").value = "";
    document.getElementById("add-task-btn").textContent = "Add task";
};

/**
 * Sort tasks by due date
 * @param {boolean} [ascending=true] - Whether to sort the tasks in ascending order or not
 * @description Sorts the tasks in the tasks array by due date. If ascending is true (default),
 *              the tasks are sorted in ascending order. Otherwise, the tasks are sorted in
 *              descending order. Re-renders the tasks to the DOM.
 */
const sortTasks = (ascending = true) => {
    tasks.sort((a, b) => {
        if (ascending) {
            // If ascending, sort the tasks by due date in ascending order
            return a.dueDate - b.dueDate;
        } else {
            // If not ascending, sort the tasks by due date in descending order
            return b.dueDate - a.dueDate;
        }
    });
    // Re-render the tasks to the DOM
    renderTasks();
};

/**
 * Removes the "active" class from the edit task container
 * @description Removes the "active" class from the edit task container, hiding the edit form
 */
const removeActiveClass = () => {
    editTaskContainer.classList.remove("active");
};

//event listeners
form.addEventListener("submit", addTask);

editForm.addEventListener("submit", updateTask);

cancelBtn.addEventListener("click", removeActiveClass);

overlay.addEventListener("click", removeActiveClass);

document.getElementById("sort-asc").addEventListener("click", () => sortTasks(true));

document.getElementById("sort-desc").addEventListener("click", () => sortTasks(false));

window.addEventListener("load", renderTasks);
