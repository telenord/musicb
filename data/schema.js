import { makeExecutableSchema } from 'graphql-tools';

import resolvers from './resolvers';

const typeDefs = `
type Query {
  song(id: ID): Song  
  songs: [Song]
  lyric(id: ID): Lyric  
  lyrics: [Lyric]
} 
 
type Song {
  id: ID
  title: String
  lyrics: [Lyric] 
}

type Lyric{
  id: ID
  likes: Int,
  content: String
}
   
type Mutation {
    addSong (
       title: String!
    ): Song!
    
    deleteSong (
       id: ID
    ): Song
    
    addLyricToSong(
      content: String!,
      songId: ID!
    ): Song!
  
    likeLyric(
      id: ID
    ): Lyric!
}
`;

const schema = makeExecutableSchema({typeDefs, resolvers});

export default schema;