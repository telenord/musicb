import {  Lyric , Song} from './connectors';

const resolvers = {
    Query: {
        songs(){
            return Song.findAll();
        },

    },
    Mutation: {
        addSong: async (parent, args) => {
            return await new Song(args).save();
            //return song;
        },
        // createTalk: async (parent, args, { Song }) => {
        //     const talk = await new Song(args).save()
        //     talk._id = talk._id.toString()
        //     return talk
        // },
    },

};

export default resolvers;