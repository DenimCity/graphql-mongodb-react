const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt } = graphql
const _ = require('lodash')

// Dummy Data

const books = [
      {id: '1', genre: 'Hip-HOp', name: 'Lion king', authorId: '1' },
      {id: '2', genre: 'Love',name: 'Forest Gump',  authorId: '2' },
      {id: '3', genre: 'Horror', name: 'Life, Not the Movie',  authorId: '3' }
];

const authors = [
      {name: 'Jean Like Denim', age: '25', id: '1'},
      {name: 'Michelle Alfred', age: '21', id: '2'},
      {name: 'Emanuella Flathead', age: '44', id: '3'}
]

const AuthorType = new GraphQLObjectType({
      name: 'Author',
      fields: () => ({
            id: {
                  type: GraphQLID
            },
            age: {
                  type: GraphQLInt
            },
            name: {
                  type: GraphQLString
            }
      })
})

const BookType = new GraphQLObjectType({
      name: 'Book',
      fields: ( ) => ({
            id: { type: GraphQLID},
            name: { type: GraphQLString },
            genre: { type: GraphQLString },
            author: {
                  type: AuthorType,
                  resolve(parent,args){
                        console.log(parent);
                        return _.find(authors, {id: parent.authorId});
                  }
            }
      }),
})


const RootQuery = new GraphQLObjectType({
      name: 'RootQueryType',
      fields: {
            book: {
                  type: BookType,
                  args: { id: { type: GraphQLID }},
                  resolve(parent, args){
                  return _.find(books, { id: args.id })
                  }
            },
            author: {
                  type: AuthorType,
                  args:{ id: { type: GraphQLID }},
                  resolve(parent, args){
                        return _.find(authors, {id: args.id })
                  }
            }

           
      }
})

module.exports = new GraphQLSchema({
      query: RootQuery
})