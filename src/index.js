import { notesList } from "./js/notesList";
// import { dateSearch } from "./js/dataProcessing";

const refs = {
  notesTable: document.querySelector("#notes"),
};

const fillNotesTable = function () {
  return notesList.reduce((tableContent, note) => {
    tableContent.push(
      `<tr><td>${note.name}</td><td>${note.created}</td><td>${
        note.category
      }</td><td>${note.content}</td><td>${""}</td></tr>`
    );
    return tableContent;
  }, []);
};
