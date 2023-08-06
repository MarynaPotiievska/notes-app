import { notesList } from "./notesList";
import {
  dateSearch,
  getDate,
  getCategoryIcon,
  getStats,
} from "./dataProcessing";
import { actionIcons, dateRegExp } from "./constants";
import { archivedNotes } from "./btnLogic";

const actionBtns = function (isActive) {
  return isActive
    ? `<button type="button" class="edit btn">${actionIcons.edit}</button>
          <button type="button" class="archive btn">${actionIcons.archive}</button>
          <button type="button" class="delete btn">${actionIcons.delete}</button>`
    : `<button type="button" class="unarchive btn">
      ${actionIcons.unarchive}
    </button>`;
};

export const noteMarkup = function (note, isActive) {
  const btnsCellClass = isActive ? "btns-cell" : "btn-cell";
  return `<tr id="${note.id}" class="row">
        <td class="table-content with-icon">${getCategoryIcon(note.category)}
            <span>${note.name}</span>
        </td>
        <td class="table-content">${
          typeof note.created === "string"
            ? note.created
            : getDate(note.created)
        }</td>
        <td class="table-content">${note.category}</td>
        <td class="table-content">${note.content}</td>
        <td class="table-content">${
          dateSearch(note.content, dateRegExp) ?? ""
        }</td>
        <td class="${btnsCellClass}">
          ${actionBtns(isActive)}
        </td>
      </tr>`;
};

export const fillNotesTable = function () {
  return notesList.reduce((tableContent, note) => {
    tableContent.push(noteMarkup(note, true));
    return tableContent;
  }, []);
};

export const fillStatsTable = function () {
  return getStats().map(
    (category) => `
    <tr class="row">
      <td class="table-content with-icon">${getCategoryIcon(category.name)}
          <span>${category.name}</span>
      </td>
      <td class="stats-data">${category.activeNotes}</td>
      <td class="stats-data">${category.acrchivedNotes}</td>
    </tr>`
  );
};

export const fillArchiveTable = function () {
  console.log(archivedNotes);
  return archivedNotes.reduce((tableContent, note) => {
    tableContent.push(noteMarkup(note, false));
    return tableContent;
  }, []);
};
