# gqltest - GraphQL Stitching

## Getting Started

To run the graphql server, run:

```bash
nodemon gateway.js
```

Then you should see:

```bash
Gateway running at http://localhost:4000/
```

To access the Apollo GraphQL Studio Explorer, go to:

```js
http://localhost:4000/
```

## A simple GraphQL instance that: 

- [x] Connects to two API data sources
- [x] Combines both schemas using stitching
- [x] Makes both data sources accessible using one query request
- [x] Shared schema data properties are kept in sync
- [x] Shared property mutations update both APIs


## Example Query and Mutation

#### Books Query
```graphql
query Book {
  books {
    id
    genre
    publisher
    title
  }
}
```
#### Example Response

```json
{
  "data": {
    "books": [
      {
        "id": "1",
        "genre": "capacitor",
        "publisher": "Random House",
        "title": "saepe dolores voluptas"
      },
      {
        "id": "2",
        "genre": "City Accounts Gender",
        "publisher": "Greenholt - Nitzsche",
        "title": "voluptatem sunt accusamus"
      },
      {
        "id": "3",
        "genre": "Coupe dismiss",
        "publisher": "Green and Sons",
        "title": "dolores ea veniam"
      },
    ]
  }
}
```


#### Authors Query
```graphql
query Author {
  authors {
    id
    name
    nationality
    publisher
  }
}
```

#### Example Response

```json
{
  "data": {
    "authors": [
      {
        "id": "1",
        "name": "Elaine Bahringer",
        "nationality": "Cuba",
        "publisher": "Random House"
      },
      {
        "id": "2",
        "name": "Jermaine VonRueden",
        "nationality": "Aruba",
        "publisher": "Lindgren - Ernser"
      },
      {
        "id": "3",
        "name": "Ed Fisher",
        "nationality": "Vietnam",
        "publisher": "Kuphal - Hoppe"
      }
    ]
  }
}
```
#### Stitched Books and Authors Query

```graphql
query Book {
  books {
    id
    genre
    publisher
    title
  }
  authors {
    id
    name
    nationality
    publisher
  }
}
```

#### Example Response
```json
{
  "data": {
    "books": [
      {
        "id": "1",
        "genre": "capacitor",
        "publisher": "Random House",
        "title": "saepe dolores voluptas"
      },
      {
        "id": "2",
        "genre": "City Accounts Gender",
        "publisher": "O'Reilly Group",
        "title": "voluptatem sunt accusamus"
      }
    ],
    "authors": [
      {
        "id": "1",
        "name": "Elaine Bahringer",
        "nationality": "Cuba",
        "publisher": "Random House"
      },
      {
        "id": "2",
        "name": "Jermaine VonRueden",
        "nationality": "Aruba",
        "publisher": "O'Reilly Group"
      }
    ]
  }
}
```


#### Update Book and Author Publisher Mutation
```graphql
mutation UpdateBookAndAuthor($bookId: ID!, $authorId: ID!, 
$publisher: String!) {
  updateBookAndAuthor(bookId: $bookId, authorId: $authorId, publisher: $publisher) {
    book {
      id
      title
      genre
      publisher
    }
    author {
      id
      name
      nationality
      publisher
    }
  }
}
```


#### Mutation Variables
```json
{
"bookId": "2",
"authorId": "2",
"publisher": "O'Reilly Group"
}

```

#### Example Response

```json
{
  "data": {
    "updateBookAndAuthor": {
      "book": {
        "id": "2",
        "title": "voluptatem sunt accusamus",
        "genre": "City Accounts Gender",
        "publisher": "O'Reilly Group"
      },
      "author": {
        "id": "2",
        "name": "Jermaine VonRueden",
        "nationality": "Aruba",
        "publisher": "O'Reilly Group"
      }
    }
  }
}
```