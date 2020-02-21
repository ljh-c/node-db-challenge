
exports.seed = function(knex) {
  return knex('table_name').insert([
    {
      name: "Go for a walk",
      description: "It's a really nice day outside",
      completed: true
    },
    {
      name: "Do my taxes",
    },
    {
      name: "World domination",
      description: "Yup"
    }
  ]);
};
