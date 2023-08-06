import { fillNotesTable, fillStatsTable } from "./js/markupCreateFn";
import {
  handleAddClick,
  handleArchiveAll,
  handleClick,
  handleDeleteAll,
  handleFormSubmit,
  handleShowArchive,
  handleUnarchiveAll,
  handleUnarchiveClick,
} from "./js/btnLogic";

export const refs = {
  notesTable: document.querySelector("#notes"),
  createBtn: document.querySelector("#create-note"),
  statsTable: document.querySelector("#statistic"),
  archiveAllBtn: document.querySelector(".archive-all"),
  deleteAllBtn: document.querySelector(".delete-all"),
  form: document.querySelector("#form"),
  category: document.querySelector(".category"),
  nameInput: document.querySelector(".name"),
  contentInput: document.querySelector(".content"),
  submitBtn: document.querySelector("#submit-btn"),
  showArchiveBtn: document.querySelector("#show-archive"),
  archiveTable: document.querySelector("#archive"),
  archivedNotesList: document.querySelector("#archived-notes"),
  unarchiveAllBtn: document.querySelector(".unarchive-all"),
};

refs.notesTable.insertAdjacentHTML("beforeend", fillNotesTable().join(""));
refs.statsTable.insertAdjacentHTML("beforeend", fillStatsTable().join(""));

refs.deleteAllBtn.addEventListener("click", handleDeleteAll);
refs.archiveAllBtn.addEventListener("click", handleArchiveAll);
refs.notesTable.addEventListener("click", handleClick);
refs.createBtn.addEventListener("click", handleAddClick);
refs.submitBtn.addEventListener("click", handleFormSubmit);
refs.showArchiveBtn.addEventListener("click", handleShowArchive);
refs.unarchiveAllBtn.addEventListener("click", handleUnarchiveAll);
refs.archivedNotesList.addEventListener("click", handleUnarchiveClick);
