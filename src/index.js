import { notesList } from "./js/notesList";
import { dateSearch, gettingDate } from "./js/dataProcessing";

const refs = {
  notesTable: document.querySelector("#notes"),
};

const fillNotesTable = function () {
  return notesList.reduce((tableContent, note) => {
    tableContent.push(
      `<tr><td>${note.name}</td><td>${gettingDate(note.created)}</td><td>${
        note.category
      }</td><td>${note.content}</td><td>${
        dateSearch(note.content) ?? ""
      }</td></tr>`
    );
    return tableContent;
  }, []);
};

refs.notesTable.insertAdjacentHTML("beforeend", fillNotesTable().join(""));
