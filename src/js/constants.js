export const months = {
  0: "January",
  1: "February",
  2: "March",
  3: "April",
  4: "May",
  5: "June",
  6: "July",
  7: "August",
  8: "September",
  9: "October",
  10: "November",
  11: "December",
};

export const dateRegExp = /[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{2,4}/g;

export const wrongDateRegExp = /[0-9]{1,2}[\\,.-][0-9]{1,2}[\\,.-][0-9]{2,4}/g;

export const categoryIcons = {
  Task: `<svg width="20" height="20" class="category-icon icon">
          <use href="./src/assets/symbol-defs.svg#task"></use>
        </svg>`,
  Idea: `<svg width="20" height="20" class="category-icon icon">
          <use href="./src/assets/symbol-defs.svg#idea"></use>
        </svg>`,
  RandomThought: `<svg width="20" height="20" class="category-icon icon">
          <use href="./src/assets/symbol-defs.svg#random-thought"></use>
        </svg>`,
};

export const actionIcons = {
  archive: `<svg width="20" height="20" class="icon">
              <use href="./src/assets/symbol-defs.svg#archive"></use>
            </svg>`,
  edit: `<svg width="20" height="20" class="icon">
          <use href="./src/assets/symbol-defs.svg#edit"></use>
        </svg>`,
  delete: `<svg width="20" height="20" class="icon">
            <use href="./src/assets/symbol-defs.svg#delete"></use>
          </svg>`,
  unarchive: `<svg width="20" height="20" class="icon">
              <use href="./src/assets/symbol-defs.svg#unarchive"></use>
            </svg>`,
};
