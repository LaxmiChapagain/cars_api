import * as userService from '../services/user.js';
/**
 * controller to get details of new user
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 */
export function addUser(req, res, next) {
    userService
        .createUser(req.body)
        .then((data) => res.json(data))
        .catch((err) => next(err));


}