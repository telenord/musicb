import React, { Component } from 'react';

import { Mutation } from 'react-apollo';

import likeLyric from '../queries/likeLyric';


class LyricList extends Component {
  onLikeClick(id, likes) {
    this.props.mutate({
      variables: {
        id
      },
      optimisticResponse: {
        __typename: 'Mutation',
        likeLyrics: {
          id,
          __typename: 'LyricType',
          likes: ++likes
        }
      }
    })
      .then(() => {
        console.log(this.props.lyrics);
      })
      .catch(err => {
        console.log(err);
      });
  }

  renderLyrics() {
    console.log(this.props.lyrics);
    if (this.props.lyrics) {
      return this.props.lyrics.map(({content, id, likes}) => (

        <li className='collection-item' key={id}>
          {content}
          <div className="vote-box right">
            <Mutation
              mutation={likeLyric} key={id}
              // update={(cache, {data: {likeLyric}}) => {
              //   const {songs} = cache.readQuery({query: GET_SONGS});
              //   cache.writeQuery({
              //     query: GET_SONGS,
              //     data: {songs: songs.filter(song => (song.id !== id))}
              //   });
              // }}
            >
              {(likeLyric) => (
                <i className='material-icons right'
                   onClick={() => likeLyric({variables: {id, likes: ++likes}})}>thumb_up</i>
              )}
            </Mutation>
            <span className="">{likes}</span>
          </div>
        </li>
      ));
    }
  }

  render() {

    return (
      <ul className='collection'>
        {this.renderLyrics()}
      </ul>
    )
  }
}


export default LyricList;