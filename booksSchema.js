const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Book {
    id: ID!
    title: String!
    genre: String!
    publisher: String!
    authorId: ID!
  }

  type Query {
    books: [Book]
  }

  type Mutation {
    createBook(title: String!, genre: String!, publisher: String!, authorId: ID!): Book
  }
`;

module.exports = typeDefs;
