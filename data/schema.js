import {
    makeExecutableSchema,
    addMockFunctionsToSchema,
} from 'graphql-tools';

import resolvers from './resolvers';

const typeDefs = `
type Query {
  song(title: String): Song  
  songs: [Song]
}  
type Song {
  id: String
  title: String
  lyrics: [Lyric] 
}
type Lyric{
  id: String
   likes: Int,
   content: String
}   
  type Mutation {
    addSong (
       title: String!
    ): Song
  }
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;