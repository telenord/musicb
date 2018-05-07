import { Lyric, Song } from './connectors';

const resolvers = {
  Query: {
    songs() {
      return Song.findAll();
    },
    song(parent, {id}) {
      return Song.findById({_id: id});
    },
    lyrics() {
      return Lyric.findAll();
    },
    lyric(parent, {id}) {
      return Lyric.findById({_id: id});
    },


  },
  Mutation: {
    addSong(parent, {title}) {
      return new Song({title}).save();
    },
    deleteSong(parent, args) {
      return Song.remove({_id: args.id});
    },
    addLyricToSong(parent, {content, songId}) {
      return Song.addLyric(songId, content);
    },
    likeLyric(parent, {id}) {
      return Lyric.like(id);
    },

    // createTalk: async (parent, args, { Song }) => {
    //     const talk = await new Song(args).save()
    //     talk._id = talk._id.toString()
    //     return talk
    // },
  },

};

export default resolvers;