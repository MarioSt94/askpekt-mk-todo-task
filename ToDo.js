export default class ToDo {
  constructor() {
    this.itemsList = [
      {
        date: "2017-02-10",
        key: 0.02009691232929452693,
        name: "dummy task",
        status: "completed",
      },
    ];
  }

  addItem(name, date, status) {
    this.itemsList.push({
      name,
      date,
      status,
      key: Math.random(),
    });
  }

  editItem(key, name, date, status) {
    let index = this.itemsList.findIndex((item) => item.key == key);
    this.itemsList[index] = {
      name: name,
      date: date,
      status: status,
      key: status,
    };
  }

  toggleStatus(key) {
    let index = this.itemsList.findIndex((item) => item.key == key);
    this.itemsList[index] = {
      name: this.itemsList[index].name,
      date: this.itemsList[index].date,
      status: this.itemsList[index].status == "active" ? "completed" : "active",
      key: key,
    };
  }

  removeItem(key) {
    const removedItemFromArray = this.itemsList.filter(
      (item) => item.key != key
    );
    this.itemsList = removedItemFromArray;
  }

  returnFilteredItems(
    instructions = { startDate: null, endDate: null, status: null }
  ) {
    let filteredList = this.itemsList;
    let helperArray = [];

    if (instructions.startDate != null) {
      filteredList.map((item) => {
        if (new Date(item.date) - new Date(instructions.startDate) >= 0) {
          helperArray.push(item);
        }
      });
      filteredList = helperArray;
      helperArray = [];
    }

    if (instructions.endDate != null) {
      filteredList.map((item) => {
        if (new Date(item.date) - new Date(instructions.endDate) <= 0) {
          helperArray.push(item);
        }
      });
      filteredList = helperArray;
      helperArray = [];
    }

    if (instructions.status != null) {
      filteredList.map((item) => {
        if (item.status == instructions.status) {
          helperArray.push(item);
        }
      });
      filteredList = helperArray;
      helperArray = [];
    }
    return filteredList;
  }

  returnSortedItems(
    instructions = { sortBy: "Date", type: "Ascending", items: this.itemsList }
  ) {
    let listToPrint = instructions.items;

    //Date Sorting
    if (instructions.sortBy == "Date") {
      listToPrint.sort((a, b) => new Date(b.date) - new Date(a.date));

      if (instructions.type == "Ascending") {
        listToPrint.reverse();
      }
    }

    //Name Sorting
    if (instructions.sortBy == "Alphabetical") {
      listToPrint.sort((a, b) =>
        a.name > b.name ? 1 : b.name > a.name ? -1 : 0
      );
      if (instructions.type == "Ascending") {
        listToPrint.reverse();
      }
    }

    //Status Sorting
    if (instructions.sortBy == "Status") {
      listToPrint.sort((a, b) =>
        a.status > b.status ? 1 : b.status > a.status ? -1 : 0
      );
      if (instructions.type == "Ascending") {
        listToPrint.reverse();
      }
    }
    return listToPrint;
  }
}
