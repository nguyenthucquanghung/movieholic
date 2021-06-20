const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BaseModel = require('./BaseModel');

const movieSchema = new Schema({
    movieId: {
        type: Number
    },
    tmdbMovieId: {
        type: Number
    },
    imdbMovieId: {
        type: Date
    },
    title: {
        type: String
    },
    originalTitle: {
        type: String
    },
    mpaa: {
        type: String
    },
    runtime: {
        type: Number
    },
    releaseDate: {
        type: Date
    },
    dvdReleaseDate: {
        type: Date
    },
    genres: {
        type: [
            String
        ]
    },
    languages: {
        type: [
            String
        ]
    },
    directors: {
        type: [
            String
        ]
    },
    actors: {
        type: [
            String
        ]
    },
    posterPath: {
        type: String
    },
    backdropPaths: {
        type: [
            String
        ]
    },
    youtubeTrailerIds: {
        type: [
            String
        ]
    },
    plotSummary: {
        type: String
    },
    numRatings: {
        type: Number
    },
    avgRating: {
        type: Number
    },
    releaseYear: {
        type: Date
    }
});

movieSchema.method('toClient', function () {
    const movie = this.toObject();

    delete movie.__v;
    delete movie.deletedAt;
    delete movie.createdAt;
    delete movie.updatedAt;

    return (movie);
});

const movieModel = BaseModel.model('movies', movieSchema);

class Movie {
    static countMovies(conditions) {
        return new Promise((resolve, reject) => {
            const query = movieModel.find(conditions).count();

            query.lean().exec((err, docs) => {
                if (docs) {
                    resolve(docs);
                } else {
                    reject(err);
                }
            });
        });

    }
    static getMovies(conditions, selectParams, limit = 48, skip=0) {
        return new Promise((resolve, reject) => {
            const query = movieModel.find(conditions).limit(limit).skip(skip);
            // const query = movieModel.find(conditions).sort({ score: { $meta: "textScore" } }).limit(limit).skip(skip);
            // const query = movieModel.find(conditions).sort({avgRating: -1,numRatings: -1}).limit(limit).skip(skip);
            if (selectParams) {
                query.select(selectParams);
            }

            query.exec((err, docs) => {
                if (docs) {
                    resolve(docs);
                } else {
                    reject(err);
                }
            });
            // query.lean().exec((err, docs) => {
            //     if (docs) {
            //         resolve(docs);
            //     } else {
            //         reject(err);
            //     }
            // });
        });
    }

    static getMovieById(id) {
        return new Promise((resolve, reject) => {
            const query = movieModel.findOne({movieId: id});
            query.exec((err, docs) => {
                if (docs) {
                    resolve(docs);
                } else {
                    reject(err);
                }
            })
        })
    }
}

module.exports = Movie;
module.exports.movieSchema = movieSchema