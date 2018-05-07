import React, { Component } from 'react';
import { Mutation } from "react-apollo";
import gql from 'graphql-tag';

import { Link, withRouter } from 'react-router-dom';
import GET_SONGS from '../queries/fetchSongs';

class SongCreate extends Component {
  constructor() {
    super();

    this.state = {
      title: ''
    }
  }

  render() {
    console.log(this.props);
    return (
      <Mutation
        mutation={ADD_SONG}
        update={(cache, {data: {addSong}}) => {
          const {songs} = cache.readQuery({query: GET_SONGS});
          cache.writeQuery({
            query: GET_SONGS,
            data: {songs: songs.concat([addSong])}
          });
        }}
      >
        {(addSong) => (
          <div>
            <Link to='/'>Back</Link>
            <h3>Create a new Song</h3>
            <form onSubmit={
              e => {
                e.preventDefault();
                addSong({variables: {title: this.state.title}});
                this.setState({value: ""});
                this.props.history.push('/')
              }
            }>
              <label>
                Song Title:
              </label>
              <input
                type='text'
                name='title'
                value={this.state.title}
                onChange={event => {
                  this.setState({title: event.target.value})
                }}
              />
            </form>
          </div>
        )}
      </Mutation>
    )
  }
}

const ADD_SONG = gql`
mutation AddSong($title: String!){
  addSong(title:$title){
    title
  }
}
`;
export default withRouter(SongCreate);