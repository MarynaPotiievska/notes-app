import { notesList } from "./notesList";
import {
  findStatsEl,
  findNoteEl,
  increaseStats,
  decreaseStats,
  createNote,
} from "./dataProcessing";
import { refs } from "..";
import { noteMarkup, fillArchiveTable } from "./markupCreateFn";

export let archivedNotes = [];
let newNotes = [];
let editedNotes = [];

const handleDeleteClick = function (event) {
  const note = event.target.parentNode.parentNode;
  const statsCategory = findStatsEl(note);
  decreaseStats(statsCategory, 1);
  note.remove();
};

const handleEditClick = function (event) {
  const note = event.target.parentNode.parentNode;
  refs.nameInput.value = note.children[0].children[1].outerText;
  refs.category.value = note.children[2].outerText;
  refs.contentInput.value = note.children[3].outerText;
  refs.form.setAttribute("note-id", note.id);
  refs.form.classList.toggle("visually-hidden");
};

const handleArchiveClick = function (event) {
  const noteEl = event.target.parentNode.parentNode;
  const statsCategory = findStatsEl(noteEl);
  const archivedNote =
    editedNotes.find((note) => note.id === noteEl.id) ||
    notesList.find((note) => note.id === noteEl.id) ||
    newNotes.find((note) => note.id === noteEl.id);
  archivedNotes = [...archivedNotes, archivedNote];
  increaseStats(statsCategory, 2);
  decreaseStats(statsCategory, 1);
  refs.archivedNotesList.insertAdjacentHTML(
    "beforeend",
    noteMarkup(archivedNote, false)
  );
  event.target.parentNode.parentNode.remove();
};

export const handleClick = function (event) {
  const className = event.target.classList.value;
  if (className === "edit btn") {
    handleEditClick(event);
  } else if (className === "archive btn") {
    handleArchiveClick(event);
  } else if (className === "delete btn") {
    handleDeleteClick(event);
  } else {
    return;
  }
};

export const handleFormSubmit = function handleFormSubmit(event) {
  event.preventDefault();
  const id =
    refs.form.getAttribute("note-id") ?? `${Math.floor(Math.random() * 110)}`;
  const note = createNote(id);
  const newStatsCtegory = findStatsEl(note);
  if (typeof note === "string") return;

  if (refs.form.hasAttribute("note-id")) {
    const target = findNoteEl("notesTable", id);
    if (target.children[2].outerText !== refs.category.value) {
      const statsCategory = findStatsEl(target);
      decreaseStats(statsCategory, 1);
    }
    target.remove();
  } else {
    newNotes = [...newNotes, note];
  }
  increaseStats(newStatsCtegory, 1);
  refs.nameInput.value = "";
  refs.contentInput.value = "";
  refs.notesTable.insertAdjacentHTML("beforeend", noteMarkup(note, true));
  refs.form.classList.toggle("visually-hidden");
};

export const handleAddClick = function () {
  refs.nameInput.value = "";
  refs.contentInput.value = "";
  refs.form.classList.toggle("visually-hidden");
};

export const handleDeleteAll = function (isActive) {
  const notes = isActive
    ? refs.notesTable.children
    : refs.archivedNotesList.children;
  const columnIndex = isActive ? 1 : 2;
  while (notes.length !== 0) {
    notes[0].remove();
  }
  const stats = refs.statsTable.children;
  for (let i = 0; i < stats.length; ++i) {
    stats[i].children[columnIndex].textContent = 0;
  }
};

export const handleArchiveAll = function () {
  const notes = refs.notesTable.children;
  for (let i = 0; i < notes.length; ++i) {
    const noteEl = findNoteEl("notesTable", notes[i].id);
    const archivedNote =
      editedNotes.find((note) => note.id === noteEl.id) ||
      notesList.find((note) => note.id === noteEl.id) ||
      newNotes.find((note) => note.id === noteEl.id);
    archivedNotes = [...archivedNotes, archivedNote];
    const statsCategory = findStatsEl(notes[i]);
    increaseStats(statsCategory, 2);
    refs.archivedNotesList.insertAdjacentHTML(
      "beforeend",
      noteMarkup(archivedNote, false)
    );
  }
  handleDeleteAll(true);
};

export const handleShowArchive = function () {
  refs.archiveTable.classList.toggle("visually-hidden");
};

export const handleUnarchiveAll = function () {
  const notes = refs.archivedNotesList.children;
  for (let i = 0; i < notes.length; ++i) {
    const noteEl = findNoteEl("archiveTable", notes[i].id);
    const note =
      editedNotes.find((note) => note.id === noteEl.id) ||
      notesList.find((note) => note.id === noteEl.id) ||
      newNotes.find((note) => note.id === noteEl.id);

    refs.notesTable.insertAdjacentHTML("beforeend", noteMarkup(note, true));
    const statsCategory = findStatsEl(notes[i]);
    increaseStats(statsCategory, 1);
  }
  archivedNotes = [];
  handleDeleteAll(false);
};

export const handleUnarchiveClick = function (event) {
  const noteEl = event.target.parentNode.parentNode;
  const statsCategory = findStatsEl(noteEl);
  decreaseStats(statsCategory, 2);
  const note = archivedNotes.find((note) => note.id === noteEl.id);
  const index = archivedNotes.indexOf(note);
  archivedNotes.splice(index, 1);
  noteEl.remove();
  refs.notesTable.insertAdjacentHTML("beforeend", noteMarkup(note, true));
  increaseStats(statsCategory, 1);
};
