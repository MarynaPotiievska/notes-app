import { notesList } from "./notesList";
import { months, categoryIcons, wrongDateRegExp } from "./constants";
import { refs } from "..";

export const dateSearch = function (content, regExp) {
  return content.match(regExp);
};

export const getDate = function (fullDate) {
  const month = months[fullDate.getMonth()];
  const date = fullDate.getDate();
  const year = fullDate.getFullYear();
  return `${month} ${date}, ${year}`;
};

export const getCategoryIcon = function (category) {
  return categoryIcons[category.replace(" ", "")];
};

const notesCount = function (category) {
  const categoryNotes = notesList.filter(
    (note) => note.category.replace(" ", "") === category
  );
  const categoryStats = {};
  if (categoryNotes.length > 0) {
    categoryStats.name =
      category === "RandomThought" ? "Random Thought" : category;
    categoryStats.acrchivedNotes = categoryNotes.reduce((total, note) => {
      return note.archived ? ++total : total;
    }, 0);
    categoryStats.activeNotes =
      categoryNotes.length - categoryStats.acrchivedNotes;
  }
  return categoryStats;
};

export const getStats = function () {
  return Object.keys(categoryIcons).reduce((stats, category) => {
    const categoryStats = notesCount(category);
    if (Object.keys(categoryStats).length > 0) {
      stats.push(categoryStats);
      return stats;
    }
    return stats;
  }, []);
};

export const findStatsEl = function (note) {
  const noteCategory = Object.keys(note).includes("category")
    ? note.category
    : note.children[2].outerText;
  const stats = refs.statsTable.children;
  let statsCategory;
  for (let i = 0; i < stats.length; ++i) {
    if (stats[i].children[0].children[1].outerText === noteCategory)
      statsCategory = stats[i];
  }
  return statsCategory;
};

export const findNoteEl = function (table, id) {
  const notes =
    table === "archiveTable"
      ? refs.archivedNotesList.children
      : refs.notesTable.children;
  let noteEl;
  for (let i = 0; i < notes.length; ++i) {
    if (notes[i].id === id) noteEl = notes[i];
  }
  return noteEl;
};

export const increaseStats = function (categoryEl, columnIndex) {
  categoryEl.children[columnIndex].textContent =
    Number(categoryEl.children[columnIndex].outerText) + 1;
};

export const decreaseStats = function (categoryEl, columnIndex) {
  categoryEl.children[columnIndex].textContent =
    Number(categoryEl.children[columnIndex].outerText) - 1;
};

export const createNote = function (id) {
  const content = refs.contentInput.value;
  const created = findNoteEl("notesTable", id)
    ? findNoteEl("notesTable", id).children[1].outerText
    : new Date();
  try {
    if (dateSearch(content, wrongDateRegExp))
      throw new Error("The date must be in format dd/mm/yyyy");
    const note = {
      id,
      name: refs.nameInput.value,
      created,
      category: refs.category.value,
      content,
    };
    return note;
  } catch (error) {
    refs.contentInput.classList.toggle("invalid");
    refs.contentInput.insertAdjacentHTML(
      "afterend",
      `<span>${error.message}</span>`
    );
    return error.message;
  }
};
