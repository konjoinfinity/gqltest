const { ApolloServer, gql } = require('apollo-server');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const fetch = require('node-fetch'); // Import 'node-fetch' correctly

const typeDefs = gql`
  type Mutation {
    updateBookAndAuthor(bookId: ID!, bookTitle: String!, authorId: ID!, authorName: String!): UpdateResult
  }

  type UpdateResult {
    book: Book
    author: Author
  }
`;

// Define your schemas and resolvers for the books service
const booksTypeDefs = gql`
  type Book {
    id: ID!
    title: String!
    genre: String!
    publisher: String!
  }

  type Query {
    books: [Book]
  }

  type Mutation {
    createBook(title: String!, genre: String!, publisher: String!): Book
  }
  type Mutation {
    updateBookAndAuthor(bookId: ID!, authorId: ID!, publisher: String!): UpdateResult
  }

  type UpdateResult {
    book: Book
    author: Author
  }
  type Author {
    id: ID!
    name: String!
    nationality: String!
    publisher: String!
  }

  type Query {
    authors: [Author]
  }

  type Mutation {
    createAuthor(name: String!, nationality: String!, publisher: String!): Author
  }
`;

const booksResolvers = {
  Query: {
    books: async () => {
      // Fetch data from the JSON API endpoint for books
      const response = await fetch('https://6516385909e3260018c989ba.mockapi.io/books');
      const data = await response.json();
      return data;
    },
  },
  Mutation: {
    createBook: async (_, { title, genre, publisher }) => {
      // Create a new book using a POST request to the JSON API endpoint
      const response = await fetch('https://6516385909e3260018c989ba.mockapi.io/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, genre, publisher }),
      });
      const newBook = await response.json();
      return newBook;
    },
  },
  Mutation: {
    updateBookAndAuthor: async (_, { bookId, authorId, publisher }) => {
      // Update the book
      const bookResponse = await fetch(`https://6516385909e3260018c989ba.mockapi.io/books/${bookId}`, {
        method: 'PUT', // Use PUT to update the existing resource
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ publisher: publisher }),
      });
      const updatedBook = await bookResponse.json();

      // Update the author
      const authorResponse = await fetch(`https://6516385909e3260018c989ba.mockapi.io/authors/${authorId}`, {
        method: 'PUT', // Use PUT to update the existing resource
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ publisher: publisher }),
      });
      const updatedAuthor = await authorResponse.json();

      return {
        book: updatedBook,
        author: updatedAuthor,
      };
    },
  },
};

// Define your schemas and resolvers for the authors service
const authorsTypeDefs = gql`
  type Author {
    id: ID!
    name: String!
    nationality: String!
    publisher: String!
  }

  type Query {
    authors: [Author]
  }

  type Mutation {
    createAuthor(name: String!, nationality: String!, publisher: String!): Author
  }
`;

const authorsResolvers = {
  Query: {
    authors: async () => {
      // Fetch data from the JSON API endpoint for authors
      const response = await fetch('https://6516385909e3260018c989ba.mockapi.io/authors');
      const data = await response.json();
      return data;
    },
  },
  Mutation: {
    createAuthor: async (_, { name, nationality, publisher }) => {
      // Create a new author using a POST request to the JSON API endpoint
      const response = await fetch('https://6516385909e3260018c989ba.mockapi.io/authors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, nationality, publisher }),
      });
      const newAuthor = await response.json();
      return newAuthor;
    },
  },
};

// Create executable schemas for each service
const booksSchema = makeExecutableSchema({
  typeDefs: booksTypeDefs,
  resolvers: booksResolvers,
});

const authorsSchema = makeExecutableSchema({
  typeDefs: authorsTypeDefs,
  resolvers: authorsResolvers,
});

// Merge the schemas into a single schema
const schema = makeExecutableSchema({
  typeDefs: [
    booksTypeDefs,
    authorsTypeDefs,
    // Include other service schemas here if needed
  ],
  resolvers: [booksResolvers, authorsResolvers],
});

// Create an Apollo Server instance with the merged schema
const server = new ApolloServer({ schema });

server.listen().then(({ url }) => {
  console.log(`Gateway running at ${url}`);
});
