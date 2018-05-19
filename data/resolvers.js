import { Lyric, Song } from './connectors';

const resolvers = {
  Query: {
    songs() {
      return Song.findAll();
    },
    song(parent, {id}) {
      return Song.findById({_id: id}).populate('lyrics');
    },
    lyrics(parent, {songId}) {
        return Lyric.findAll(songId);
    },
    lyric(parent, {id}) {
      return Lyric.findById({_iid: id});
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
  },
};

export default resolvers;