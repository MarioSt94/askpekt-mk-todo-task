export default class ToDo {
  constructor() {
    this.itemsList = [
      {
        date: "2017-02-10",
        key: 0.02009691232929452693,
        name: "Bario Stojkovski",
        status: "completed",
      },
      {
        date: "2017-01-11",
        key: 0.020096932123192945262323,
        name: "Aario Stojkovski",
        status: "active",
      },
      {
        date: "2011-01-11",
        key: 0.0120969329211945262323,
        name: "Aaaaa Stojkovski",
        status: "active",
      },
      {
        date: "2014-01-11",
        key: 0.01209693292942315262323,
        name: "Aaaaa Stojkovski",
        status: "completed",
      },
      {
        date: "2012-01-11",
        key: 0.0120969329321312945262323,
        name: "Aaaaa Stojkovski",
        status: "active",
      },
      {
        date: "2013-01-11",
        key: 0.012096932912312945262323,
        name: "Aaaaa Stojkovski",
        status: "completed",
      },
      {
        date: "2010-01-11",
        key: 0.01209693292131232945262323,
        name: "Aaaaa Stojkovski",
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
