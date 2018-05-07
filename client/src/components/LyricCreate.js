import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

class LyricCreate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ''
    }
  }


  render() {
    return (
      <Mutation mutation={AddLyricToSong}>
        {(addLyricToSong) => (
          <div>
            <form onSubmit={e => {
              e.preventDefault();
              addLyricToSong({
                variables: {
                  content: this.state.content,
                  songId: this.props.songId
                }
              });
              this.setState({content: ""});
            }}>
              <label>
                Add Lyrics:
              </label>
              <input
                type='text'
                name='title'
                value={this.state.content}
                onChange={event => {
                  this.setState({content: event.target.value})
                }}
              />
            </form>
          </div>
        )}
      </Mutation>
    )
  }
}

const AddLyricToSong = gql`
mutation AddLyricToSong($content: String!, $songId: ID!){
  addLyricToSong(content: $content, songId: $songId){
     id
     lyrics {
      id
      content
      likes
     }
  }
}`;
export default LyricCreate;