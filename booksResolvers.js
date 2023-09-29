const books = [];
let bookId = 1;

const resolvers = {
  Query: {
    books: () => books,
  },
  Mutation: {
    createBook: (_, { title, genre, publisher, authorId }) => {
      const newBook = { id: String(bookId++), title, genre, publisher, authorId };
      books.push(newBook);
      return newBook;
    },
  },
};

module.exports = resolvers;
