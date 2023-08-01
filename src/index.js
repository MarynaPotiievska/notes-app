import { notesList } from "./js/notesList";
import { dateSearch, getDate, getCategoryIcon } from "./js/dataProcessing";
import { actionIcons } from "./js/constants";

const refs = {
  notesTable: document.querySelector("#notes"),
  headline: document.querySelector("#headline"),
  createBtn: document.querySelector("#create-note"),
};

const headlineActions = `<th><button type="button">${actionIcons.archive}</button> <button type="button">${actionIcons.delete}</button></th>`;

const fillNotesTable = function () {
  return notesList.reduce((tableContent, note) => {
    tableContent.push(
      `<tr><td>${getCategoryIcon(note.category)}<span>${
        note.name
      }</span></td><td>${getDate(note.created)}</td><td>${
        note.category
      }</td><td>${note.content}</td><td>${
        dateSearch(note.content) ?? ""
      }</td><td><button type="button">${
        actionIcons.edit
      }</button><button type="button">${
        actionIcons.archive
      }</button><button type="button">${actionIcons.delete}</button></td></tr>`
    );
    return tableContent;
  }, []);
};

refs.headline.insertAdjacentHTML("beforeend", headlineActions);
refs.notesTable.insertAdjacentHTML("beforeend", fillNotesTable().join(""));

refs.createBtn.addEventListener("click");
