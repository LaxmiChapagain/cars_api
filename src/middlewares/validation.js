// input format level validation in joi and data level validation in services

import joi from 'joi';

export function validateBody(schema) {
    // named export
    return function validation(req, res, next) {
        try {
            joi.assert(req.body, schema); // validating req,body with schema
            next();
        } catch (err) {
            next(err);;
        }
    };
}

export function validateQueryParams(schema) {
    // named export
    return function validation(req, res, next) {
        try {
            joi.assert(req.query, schema); // validating req.query(getko link) with schema
            next();
        } catch (err) {
            next(err);
        }
    };
}