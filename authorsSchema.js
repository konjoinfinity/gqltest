const { gql } = require('apollo-server-express');

const typeDefs = gql`
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

module.exports = typeDefs;
