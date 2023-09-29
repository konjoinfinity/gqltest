const { mergeSchemas } = require('graphql-tools'); // Import mergeSchemas from graphql-tools
const booksSchema = require('./booksSchema');
const authorsSchema = require('./authorsSchema');

const schema = mergeSchemas({
  schemas: [booksSchema, authorsSchema],
});

module.exports = schema;