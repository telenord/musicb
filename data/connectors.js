import Mongoose from 'mongoose';

const Schema = Mongoose.Schema;
Mongoose.Promise = global.Promise;
const mongo = Mongoose.connect('mongodb://localhost:27017/lyrics');

const LyricSchema = new Schema({
    content: {type: String},
    song: {
        type: Schema.Types.ObjectId,
        ref: 'song'
    },
    likes: {type: Number, default: 0}
});

LyricSchema.statics.like = function (id) {
    return this.findById({_id: id})
        .then(lyric => {
            ++lyric.likes;
            return lyric.save();
        })
};
LyricSchema.statics.findAll = function (songId) {
    return Song.findById({_id: songId})
        .populate('lyrics')
        .then(
            song => {
                return song;
            }
        )
        .catch(err => {
            console.log(err);
        })
};

const Lyric = Mongoose.model('lyrics', LyricSchema);

const SongSchema = new Schema({
    title: {type: String},
    lyrics: [{type: Schema.Types.ObjectId, ref: 'lyrics'}]
}, {
    usePushEach: true
});

SongSchema.statics.addLyric = function (id, content) {
    return this.findById({_id: id})
        .populate('lyrics')
        .then(song => {
            const lyric = new Lyric({content: content, songId: song._id});
            song.lyrics.push(lyric);
            return Promise.all([lyric.save(), song.save()])
                .then(([lyric, song]) => song);
        });
};

SongSchema.statics.findAll = function () {
    return this.find()
        .then(songs => {
            return songs;
        });
};

const Song = Mongoose.model('song', SongSchema);

export {Lyric, Song};