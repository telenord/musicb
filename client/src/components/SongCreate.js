import React, { Component } from 'react';
import { Mutation } from "react-apollo";
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import fetchSongs from '../queries/fetchSongs';

class SongCreate extends Component {
  constructor() {
    super();

    this.state = {
      title: ''
    }
  }


  onSubmit(e) {
    e.preventDefault();

      this.props.mutate({
      variables: {
        title: this.state.title
      },
      refetchQueries: [{query: fetchSongs}]
    })
      .then(()=>{
        //hashHistory.push('/')
      })
      .catch(err=>{
        console.log(err);
      });
  }

  render() {
    return (
        <Mutation mutation={mutation}>
            {(AddSong, { data }) => (
      <div>
        <Link to='/'>Back</Link>
        <h3>Create a new Song</h3>
        <form onSubmit={
            e => {
                e.preventDefault();
                AddSong({ variables: { title: this.state.title } });
                this.setState({value : ""});
            }
          //this.onSubmit.bind(this)
        }>
          <label>
            Song Title:
          </label>
          <input
            type='text'
            name='title'
            value={this.state.title}
            onChange={event => {this.setState({title: event.target.value})}}
          />
        </form>
      </div>
            )}
        </Mutation>
    )
  }
}

const mutation = gql`
mutation AddSong($title: String){
  addSong(title:$title){
    title
  }
}
`;
export default  SongCreate;