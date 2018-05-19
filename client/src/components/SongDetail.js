import React from 'react';

import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import LyricCreate from './LyricCreate';
import LyricList from './LyricList';
import GET_SONG from '../queries/fetchSong';


const SongDetail = ({match:{params}}) => (
  <Query query={GET_SONG} variables={{id: params.id}}>
    {({loading, error, data:{song}}) => {
      if (loading) return null;
      if (error) return `Error!: ${error}`;
      if (song) {
        const {id, title, lyrics} = song;
        return (
          <div>
            <Link to='/'>Back</Link>
            <div>{id}</div>
            <h3>{title}</h3>
            <LyricList lyrics={lyrics}/>
            <LyricCreate songId={params.id}/>
          </div>
        )
      }
      return null;
    }}
  </Query>
);


export default SongDetail;