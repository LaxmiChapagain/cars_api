import * as manufacturerService from '../services/manufacturer.js';
/**
 * controller to get details of all manufacturers
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 */
export function getManufacturers(req, res, next) {
    manufacturerService.getManufacturers()
        .then((data) => res.json(data))
        .catch((err) => next(err));


}