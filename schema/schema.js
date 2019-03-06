const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList } = graphql
const _ = require('lodash')

// Dummy Data

const books = [
      {id: '1', genre: 'Hip-HOp', name: 'Lion king', authorId: '1' },
      {id: '2', genre: 'Love',name: 'Forest Gump',  authorId: '2' },
      {id: '3', genre: 'Horror', name: 'Color Purple',  authorId: '3' },
      {id: '2', genre: 'Love',name: 'Forest Gump',  authorId: '2' },
      {id: '3', genre: 'Love', name: 'Friday',  authorId: '2' },
      {id: '2', genre: 'Romantic',name: 'Brady Bunch',  authorId: '2' },
      {id: '3', genre: 'Fiction', name: 'Author',  authorId: '3' },
      {id: '2', genre: 'Non-fiction',name: 'Red Dress',  authorId: '2' },
      {id: '3', genre: 'Non', name: 'Broken Egg',  authorId: '3' }
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
            },
            books:{
                  type: new GraphQLList(BookType),
                  resolve(parent, args){
                        return _.filter(books, {
                              authorId: parent.id
                        })
                  }
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
            },
            books:{
                  type: new GraphQLList(BookType),
                  resolve(parent, args){
                        return books
                  }
            },
            authors: {
                  type: new GraphQLList(AuthorType),
                  resolve(parent,args){
                        return authors;
                  }
            }

           
      }
})

module.exports = new GraphQLSchema({
      query: RootQuery
})