module.exports.validationError = (res, error = 'Data provided is not valid') => {
    addHeaders(res);

    res.statusCode = 422;

    res.end(JSON.stringify({
        status: 'fail',
            error
    }, null, 4));
};

module.exports.error = (res, error = 'An unknown error occurred', statusCode = 500) => {
    addHeaders(res);

    res.statusCode = statusCode;

    res.end(JSON.stringify({
        status: 'fail',
        error
    }, null, 4));
};

module.exports.change

module.exports.unauthorized = (res, error = 'Unauthorized', statusCode = 401) => {
    addHeaders(res);
    res.statusCode = statusCode;
    res.end(JSON.stringify({
        status: 'unauthorized',
        error
    }, null, 4));
}

module.exports.success = (res, data = null, meta = null) => {
    addHeaders(res);

    res.statusCode = 200;

    res.end(JSON.stringify({
        status: 'success',
        data,
        meta
    }, null, 4));
};

const addHeaders = (res) => {
    return res.setHeader('Content-Type', 'application/json');
}