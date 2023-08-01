import { dateRegExp } from "./regExp";
import { months } from "./constants";

export const dateSearch = function (content) {
  const regExp = new RegExp(dateRegExp, "g");
  const dates = content.match(regExp);
  return dates;
};

export const gettingDate = function (fullDate) {
  const month = months[fullDate.getMonth()];
  const date = fullDate.getDate();
  const year = fullDate.getFullYear();
  return `${month} ${date}, ${year}`;
};
