import ToDo from "./ToDo.js";
import DomRender from "./DomRender.js";

let app = new ToDo();
let taskRender = new DomRender("#tasks-to-show");
let itemsToPrint = app.itemsList;
let filterBy = [null, null, null];
let sortBy = ["Date", ""];

let filterByHandler = () => {
  let filterToSend = {
    startDate: filterBy[0],
    endDate: filterBy[1],
    status: filterBy[2],
  };
  itemsToPrint = app.returnFilteredItems(filterToSend);
};
filterByHandler();

let sortByHandler = (type = sortBy[0], direction = sortBy[1]) => {
  filterByHandler();
  itemsToPrint = app.returnSortedItems({
    sortBy: type,
    type: direction,
    items: itemsToPrint,
  });
  sortBy = [type, direction];
  render();
};

let render = () => {
  taskRender.fullPageRender(itemsToPrint);
};

sortByHandler();

let reRender = () => {
  itemsToPrint = app.itemsList;
  filterByHandler();
  sortByHandler();
};

const addItemHandler = (itemName, itemDate, itemStatus) => {
  if (itemName.length > 0 && itemDate.length > 0) {
    app.addItem(itemName, itemDate, itemStatus);
    reRender();
  }
};

const openEditorHandler = (itemDiv) => {
  let itemData = app.itemsList.filter(
    (item) => item.key == itemDiv.attributes.key.value
  );
  taskRender.render({
    typeOfRender: "EDIT",
    itemDiv: itemDiv,
    item: itemData[0],
  });
};

const saveEditHandler = (parent) => {
  let parentKey = parent.attributes.key.value;
  let children = parent.children;

  app.editItem(
    parentKey,
    children[0].value,
    children[1].value,
    children[2].value
  );
  reRender();
};

const toggleTaskStatus = (parent) => {
  let parentKey = parent.attributes.key.value;
  app.toggleStatus(parentKey);
  reRender();
};

const deleteItemHandler = (key) => {
  app.removeItem(key);
  reRender();
};

document.addEventListener("click", (e) => {
  if (e.target.id === "add-task-button") {
    e.preventDefault();
    let itemName = document.querySelector("#name").value;
    let itemDate = document.querySelector("#date").value;
    let itemStatus = document.querySelector("#status").value;
    addItemHandler(itemName, itemDate, itemStatus);
  }
  if (e.target.className.includes("edit-task")) {
    openEditorHandler(e.target.parentElement.parentElement);
  }
  if (e.target.className.includes("save-edit")) {
    let parent = e.target.parentElement.parentElement;
    saveEditHandler(parent);
  }

  if (e.target.className.includes("solved-task")) {
    let parent = e.target.parentElement.parentElement;
    toggleTaskStatus(parent);
  }

  if (e.target.className.includes("cancel-edit")) {
    reRender();
  }

  if (e.target.className.includes("delete-task")) {
    deleteItemHandler(
      e.target.parentElement.parentElement.attributes.key.value
    );
  }

  if (e.target.id.includes("sort-by")) {
    let sortByList = e.target.id.split("-");
    switch (sortByList[2]) {
      case "date":
        if (sortBy[0] == "Date" && sortBy[1] != "Ascending") {
          sortByHandler("Date", "Ascending");
        } else {
          sortByHandler("Date", "");
        }
        break;
      case "name":
        if (sortBy[0] == "Alphabetical" && sortBy[1] != "Ascending") {
          sortByHandler("Alphabetical", "Ascending");
        } else {
          sortByHandler("Alphabetical", "");
        }
        break;
      case "status":
        if (sortBy[0] == "Status" && sortBy[1] != "Ascending") {
          sortByHandler("Status", "Ascending");
        } else {
          sortByHandler("Status", "");
        }
        break;
      default:
        break;
    }
  }
  if (e.target.id == "filter-button") {
    let start =
      document.querySelector("#start-date").value == ""
        ? null
        : document.querySelector("#start-date").value;
    let end =
      document.querySelector("#end-date").value == ""
        ? null
        : document.querySelector("#end-date").value;
    let statusFilter =
      document.querySelector("#status-filter").value == "all"
        ? null
        : document.querySelector("#status-filter").value;
    filterBy = [start, end, statusFilter];
    reRender();
  }
  if (e.target.id == "cancel-filter") {
    document.querySelector("#start-date").value = "";
    document.querySelector("#end-date").value = "";
    document.querySelector("#status-filter").value = "all";

    filterBy = [null, null, null];
    reRender();
  }
});
