export const parseFilterParams = (query) => {
  const { categories, title } = query;
  const filter = {};

  if (categories) {
    filter.categories = {
      $regex: categories,
      $options: "i",
    };
  }

  if (title) {
    filter.title = {
      $regex: title,
      $options: "i",
    };
  }

  return filter;
};
