const authors = [];
let authorId = 1;

const resolvers = {
  Query: {
    authors: () => authors,
  },
  Mutation: {
    createAuthor: (_, { name, nationality, publisher }) => {
      const newAuthor = { id: String(authorId++), name, nationality, publisher };
      authors.push(newAuthor);
      return newAuthor;
    },
  },
};

module.exports = resolvers;
