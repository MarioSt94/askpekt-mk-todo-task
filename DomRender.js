export default class DomRender {
  constructor(domItemId) {
    this.domItemId = document.querySelector(domItemId);
  }

  fullPageRender(items) {
    this.domItemId.innerHTML = "";
    if (items.length > 0) {
      items.map((item) => {
        this.render({
          typeOfRender: "REGULAR",
          item,
        });
      });
    } else {
      this.domItemId.innerHTML = "<h3>No tasks to display</h3>";
    }
  }

  render = (instructions) => {
    if (instructions.typeOfRender === "EDIT") {
      let html = `
      <textarea class="edit-field neumorphism-pressed">${
        instructions.item.name
      }</textarea>
      <input class="edit-field neumorphism-pressed" type="date" value="${
        instructions.item.date
      }" />
      <select class="edit-field neumorphism-pressed" id="edit-status">
        <option value="active" ${
          instructions.item.status === "active" && "selected"
        }>Active</option>
        <option value="completed" ${
          instructions.item.status === "completed" && "selected"
        }>Completed</option>
      </select>
      <div class="task-actions">
        <button class="cancel-edit neumorphism-convex">Cancel</button>
        <button class="save-edit neumorphism-convex">Save</button>
      </div>`;

      instructions.itemDiv.innerHTML = html;
    }
    if (instructions.typeOfRender === "REGULAR") {
      let html = `<div class="task neumorphism-pressed" key="${
        instructions.item.key
      }">
      <p>${instructions.item.name}</p>
      <p>${instructions.item.date}</p>
      <div class="solved">
        <label for="${instructions.item.key}">${
        instructions.item.status
      }</label>
        <input type="checkbox" class="solved-task" ${
          instructions.item.status == "completed" && "checked"
        } id="${instructions.item.key}"/>
      </div>
      <div class="task-actions">
        <button class="edit-task neumorphism-convex">Edit</button>
        <button class="delete-task neumorphism-convex">Delete</button>
      </div>
      </div>`;
      this.domItemId.innerHTML += html;
    }
  };
}
