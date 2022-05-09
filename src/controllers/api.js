import * as apiService from '../services/api.js';

export function getAPTDetails(req, res, next) {
    try {
        const data = apiService.getAPIDetails();

        res.json(data);
    } catch (err) {
        next(err);

    }
}