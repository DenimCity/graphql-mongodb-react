import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { getAuthorsQuery, getBooksQuery, addBookMutation } from '../queries/';



 class AddBook extends Component {

      state = {
            name: '',
            genre: '',
            authorId:''
      }

      submitForm = (e) => {
            e.preventDefault()
            const { name, genre, authorId} = this.state;
            const { addBookMutation} = this.props
            const variables =  {
                        name:  name, 
                        genre:  genre, 
                        authorId:  authorId
            }
            addBookMutation({
                  variables,
                  refetchQueries:[ { query: getBooksQuery }]
            });
      }


      displayAuthors = () => {
            const data = this.props.getAuthorsQuery
            if ( data.loading){
                  return (<option> Loading Authors</option>)
            } else {
                 return data.authors.map((author, index)=> {
                       return( <option key={author.id} value={author.id}>  {author.name} </option>)
                 })
            }
      }

  render() {
    return (
      <form id="add-book" onSubmit={this.submitForm}>
            <div className='field'>
                  
                  <label>Book name:</label>
                  <input type='text' onChange= { (e) => this.setState({ name: e.target.value})}/>
            </div>
            <div className='field'>
                  <label>Genre:</label>
                  <input type='text' onChange= { (e) => this.setState({ genre: e.target.value})}/>
            </div>
            <div className='field'>
                  <label>Author:</label>
                  <select onChange= { (e) => this.setState({ authorId: e.target.value})}>
                        <option> Select Author </option>
                        {this.displayAuthors()}
                  </select>
            </div>
            <button className='book-button'>+</button>
      </form>
    )
  }
}
export default compose(
      graphql(getAuthorsQuery,{ name: "getAuthorsQuery"}),
      graphql(addBookMutation,{ name: "addBookMutation"}),
)(AddBook)
