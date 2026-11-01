document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("todo-form");
  const input = document.getElementById("todo-input");
  const list = document.getElementById("todo-list");
  const error = document.getElementById("error-msg");
  const counter = document.getElementById("counter");

  let currentFilter = "all";

  function updateCounter() {
    const activeItems = list.querySelectorAll("li:not(.completed)");
    counter.textContent = activeItems.length + " item(s) left";
  }

  function applyFilter() {
    const items = list.querySelectorAll("li");

    items.forEach(function (item) {
      if (currentFilter === "all") {
        item.style.display = "";
      } else if (currentFilter === "active") {
        item.style.display = item.classList.contains("completed") ? "none" : "";
      } else {
        item.style.display = item.classList.contains("completed") ? "" : "none";
      }
    });
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const text = input.value.trim();

    if (text === "") {
      error.classList.remove("hidden");
      return;
    }

    error.classList.add("hidden");

    const item = document.createElement("li");
    const taskText = document.createElement("span");
    const deleteButton = document.createElement("button");

    taskText.textContent = text;
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-btn");

    item.appendChild(taskText);
    item.appendChild(deleteButton);
    list.appendChild(item);

    input.value = "";

    applyFilter();
    updateCounter();
  });

  list.addEventListener("click", function (event) {
    const item = event.target.closest("li");

    if (!item) {
      return;
    }

    if (event.target.classList.contains("delete-btn")) {
      item.remove();
    } else {
  item.classList.toggle("completed");
    }

    applyFilter();
    updateCounter();
  });

  document.getElementById("filter-all").addEventListener("click", function () {
    currentFilter = "all";
    applyFilter();
  });

  document.getElementById("filter-active").addEventListener("click", function () {
    currentFilter = "active";
    applyFilter();
  });

  document.getElementById("filter-done").addEventListener("click", function () {
    currentFilter = "done";
    applyFilter();
  });

  updateCounter();
});
