import React from 'react';
import { Link } from 'react-router-dom';

import DELETE_SONG from '../queries/deleteSong';

import gql from "graphql-tag";
import { Mutation, Query } from "react-apollo";

const GET_SONGS = gql`
{
  songs{
    id
    title    
  }
}
`;



const renderSongs = (data) => {
  if (data && data.songs) {
    return data.songs.map(({title, id}) => (

      <li className='collection-item' key={id}>
        <Link to={`/songs/${id}`}>{title}</Link>
        <Mutation
          mutation={DELETE_SONG} key={id}
          update={(cache, {data: {deleteSong}}) => {
            const {songs} = cache.readQuery({query: GET_SONGS});
            cache.writeQuery({
              query: GET_SONGS,
              data: {songs: songs.filter(song => (song.id !== id))}
            });
          }}
        >
          {(deleteSong) => (
            <i className='material-icons right' onClick={() => deleteSong({variables: {id}})}>delete</i>
          )}
        </Mutation>

      </li>
    ));
  }
}

const SongList = () => (
  <Query query={GET_SONGS}>
    {({loading, error, data}) => {
      if (loading) return "Loading...";
      if (error) return `Error! ${error.message}`;

      return (
        <div>
          <ul className='collection'>
            {renderSongs(data)}
          </ul>
          <Link to='/songs/new'
                className='btn-floating btn-large red right'>
            <i className='material-icons'>add</i>
          </Link>
        </div>
      );
    }}
  </Query>
);
export default SongList;