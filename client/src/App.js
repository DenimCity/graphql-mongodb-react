import React, { Component } from 'react';
import ApolloClient from 'apollo-boost'
import { ApolloProvider }  from 'react-apollo';
import BookList from './components/BookList';

import AddBook from './components/AddBook';
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  onError:({ networkError, graphqlErrors}) => {
    console.log('--network error ',networkError)
    console.log('--graphql error ',graphqlErrors)
  }

})
class App extends Component {
  render() {
    return (
     <ApolloProvider client={client}>
        <div id="main">
        <h1>Jeans Reading List</h1>
        <BookList/>
        <AddBook/>
      </div>
     </ApolloProvider>
    );
  }
}

export default App;
