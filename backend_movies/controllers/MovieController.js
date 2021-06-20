const Movie = require('./../models/Movie');
const helpers = require('./../common/helpers');

class MovieController {
    // GET /movies
    async index(req, res, param, postData, params) {
        try {
            const selectParams = {};

            const _total = await Movie.countMovies({
                // categories: {$elemMatch: {category_id: parseInt(params.categoryId)}}
            });
            const _pageSize = parseInt(params.pageSize);
            const _noOfPages = Math.ceil(_total / _pageSize);
            const _curPage = parseInt(params.page);
            const _skip = (_curPage - 1) * _pageSize;
            const meta = {
                total: _total,
                noOfPages: _noOfPages,
                currentPage: _curPage,
                pageSize: _pageSize
            }

            const movies = await Movie.getMovies({
                numRatings: {$gt:1000}
                // categories: {$elemMatch: {category_id: parseInt(params.categoryId)}}
            }, selectParams, _pageSize, _skip);

            return helpers.success(res, movies, meta);
        } catch (error) {
            return helpers.error(res, error);
        }
    }

    async get(req, res, param) {
        try {
            const movie = await Movie.getMovieById(param);
            return helpers.success(res, movie);
        } catch (err) {
            return helpers.error(res, err);
        }

    }

    // GET /search/movies
    async searchMovie(req, res, param, postData, params) {
        params.searchText = params.searchText.replace(/[^a-zA-Z0-9]/g, ' ');
        try {
            const selectParams = {};

            const _total = await Movie.countMovies({
                $text: {$search: params.searchText}
            });
            const _pageSize = parseInt(params.pageSize);
            const _noOfPages = Math.ceil(_total / _pageSize);
            const _curPage = parseInt(params.page);
            const _skip = (_curPage - 1) * _pageSize;
            const meta = {
                total: _total,
                noOfPages: _noOfPages,
                currentPage: _curPage,
                pageSize: _pageSize
            }

            const movies = await Movie.getMovies({
                $text: {$search: params.searchText}
            }, selectParams, _pageSize, _skip);

            return helpers.success(res, movies, meta);
        } catch (error) {
            return helpers.error(res, error);
        }
    }

    // GET /search/movies
    async search(req, res, param, postData, params) {
        try {
            const selectParams = {};

            const _total = await Movie.countMovies({
                $text: {$search: params.searchText}
            });
            const _pageSize = parseInt(params.pageSize);
            const _noOfPages = Math.ceil(_total / _pageSize);
            const _curPage = parseInt(params.page);
            const _skip = (_curPage - 1) * _pageSize;
            const meta = {
                total: _total,
                noOfPages: _noOfPages,
                currentPage: _curPage,
                pageSize: _pageSize
            }

            const movies = await Movie.getMovies({
                $text: {$search: params.searchText},
            }, selectParams, _pageSize, _skip);

            return helpers.success(res, movies, meta);
        } catch (error) {
            return helpers.error(res, error);
        }
    }
}

module.exports = new MovieController();