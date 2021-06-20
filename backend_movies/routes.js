/**
 * We define all our routes in this file. Routes are matched using `path`.
 * 1. If "path" is a string, then we simply match with url
 * 2. If "path" is a object, then we assume it is a RegEx and use RegEx matching
 */

const movieController = require('./controllers/MovieController');

const routes = [
    {
        method: 'GET',
        path: /\/movies\/([0-9a-z]+)/,
        handler: movieController.get.bind(movieController)
    },
    {
        method: 'GET',
        path: '/movies',
        handler: movieController.index.bind(movieController)
    },
    {
        method: 'GET',
        path: '/search/movies',
        handler: movieController.search.bind(movieController)
    },
];

module.exports = routes;