import Mongoose from 'Mongoose';

const Schema = Mongoose.Schema;
Mongoose.Promise = global.Promise;
const mongo = Mongoose.connect('mongodb://localhost/lyrics');


const LyricSchema = new Schema({
    song: {
        type: Schema.Types.ObjectId,
        ref: 'song'
    },
    likes: {type: Number, default: 0},
    content: {type: String}
});

LyricSchema.statics.like = function (id) {
    const Lyric = Mongoose.model('lyric');

    return Lyric.findById(id)
        .then(lyric => {
            ++lyric.likes;
            return lyric.save();
        })
}

const Lyric = Mongoose.model('lyric', LyricSchema);

const SongSchema = new Schema({
    title: {type: String},
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    lyrics: [{
        type: Schema.Types.ObjectId,
        ref: 'lyric'
    }]
}, {
    usePushEach: true
});

SongSchema.statics.addLyric = function (id, content) {
    const Lyric = Mongoose.model('lyric');

    return this.findById(id)
        .then(song => {
            const lyric = new Lyric({content, song})
            song.lyrics.push(lyric)
            return Promise.all([lyric.save(), song.save()])
                .then(([lyric, song]) => song);
        });
}
SongSchema.statics.findAll = function () {

    return this.find()
        .then(songs => {
            return songs
        });
}

SongSchema.statics.findLyrics = function (id) {
    return this.findById(id)
        .populate('lyrics')
        .then(song => song.lyrics);
}

const Song = Mongoose.model('song', SongSchema);


const ViewSchema = Mongoose.Schema({
    postId: Number,
    views: Number,
});


export {Lyric, Song};