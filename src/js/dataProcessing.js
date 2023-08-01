import { dateRegExp } from "./regExp";
import { months } from "./constants";
import { categoryIcons } from "./constants";

export const dateSearch = function (content) {
  const regExp = new RegExp(dateRegExp, "g");
  const dates = content.match(regExp);
  return dates;
};

export const getDate = function (fullDate) {
  const month = months[fullDate.getMonth()];
  const date = fullDate.getDate();
  const year = fullDate.getFullYear();
  return `${month} ${date}, ${year}`;
};

export const getCategoryIcon = function (category) {
  return categoryIcons[category.replaceAll(" ", "")];
};
