import React, { Component } from 'react';

import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import LyricCreate from './LyricCreate';
import LyricList from './LyricList';
import query from '../queries/fetchSong';

class SongDetail extends Component {

  render() {
    const {data: {song}, loading} = this.props;

    if (loading) {
      return <div>Loading</div>
    }

    if (song) {
      const {id, title, lyrics} = song;
      return (
        <div>
          <Link to='/'>Back</Link>
          <div>{id}</div>
          <h3>{title}</h3>
          <LyricList lyrics={lyrics}/>
          <LyricCreate songId={this.props.params.id}/>
        </div>
      )
    }

    return null;
  }
}

SongDetail = graphql(query, {
  options: ({params}) => {
    return {
      variables: {
        id: params.id
      }
    }
  }
})(SongDetail);

export default SongDetail;