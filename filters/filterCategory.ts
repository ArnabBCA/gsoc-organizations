const filters = {
  "": "Other",
};

const filter = (category: string) => {
  if (category in filters) {
    return filters[category];
  }
  return category.trim();
};

module.exports = {
  filter: filter,
};
