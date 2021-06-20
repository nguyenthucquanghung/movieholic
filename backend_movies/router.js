const helpers = require('./common/helpers');
const querystring = require('querystring');

module.exports = async (req, res, routes) => {
    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }
    // Find a matching route
    const route = routes.find((route) => {
        const methodMatch = route.method === req.method;
        let pathMatch = false;

        if (typeof route.path === 'object') {
            // Path is a RegEx, we use RegEx matching
            pathMatch = req.url.match(route.path);
        }
        else {
            // Path is a string, we simply match with URL
            pathMatch = route.path === req.url.split('?')[0];
        }

        return pathMatch && methodMatch;
    });
    // Extract the "id" parameter from route and pass it to controller
    let param = null;

    if (route && typeof route.path === 'object') {
        param = req.url.match(route.path)[1];
    }

    // Extract the query params
    let params = {}
    if (route && req.url.includes('?')) {
        [, queryString] = req.url.split('?');
        params = querystring.parse(queryString);
    }

    // Extract request body
    if (route) {
        let body = null;
        if (req.method === 'POST' || req.method === 'PUT') {
            body = await getPostData(req);
        }
        return route.handler(req, res, param, body, params);
    }
    else {
        return helpers.error(res, 'Endpoint not found', 404);
    }
};

/**
 * Extract posted data from request body
 * @param req
 * @returns {Promise<any>}
 */
function getPostData(req) {
    return new Promise((resolve, reject) => {
       try {
           let body = '';
           req.on('data', chunk => {
               body += chunk.toString(); // convert Buffer to string
           });

           req.on('end', () => {
               //resolve(parse(body));
               resolve(body);
           });
       }
       catch (e) {
           reject(e);
       }
    });
}