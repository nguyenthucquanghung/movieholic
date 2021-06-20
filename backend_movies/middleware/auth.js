const jwt = require('jsonwebtoken');
const User = require('../models/User');
const helpers = require('./../common/helpers');

const auth = async (req, res) => {
    const token = req.headers.authorization.replace('Bearer ', '');
    const data = jwt.verify(token, process.env.JWT_KEY);
    console.log(data);
    try {
        const user = await User.getUser({_id: data._id, tokens: {$elemMatch: {token: token}}});
        if (!user) return "unauthorized";
        else return user[0];
    } catch (error) {
        return error
    }
}
module.exports = auth
