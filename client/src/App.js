import React, { Component } from 'react';
import ApolloClient from 'apollo-boost'
import { ApolloProvider }  from 'react-apollo';

import BookList from './components/Booklist';




const client = new ApolloClient({
  ur: 'http://localhost:4000/graphql',

})
class App extends Component {
  render() {
    return (
     <ApolloProvider client={client}>
        <div id="main">
        <h1>Jeans Reading List</h1>
        <BookList/>
      </div>
     </ApolloProvider>
    );
  }
}

export default App;
