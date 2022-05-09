import Joi from 'Joi';
import HttpStatusCodes from 'http-status-codes';

export default (err, req, res, next) => {

    const error = buildError(err);
    res.status(error.code).json(error);
}

function buildError(err) {

    // Check if the errror is joi and handle accordingly
    if (Joi.isError(err)) {
        return {
            code: HttpStatusCodes.BAD_REQUEST,
            message: 'Validation Error',
            details: err.details.map((e) => e.message),
        };
    }
    // check if the error is Boom type and handle accordingly
    if (err.isBoom) {
        return {
            code: err.output.statusCode,
            message: err.output.payload.message,
        };
    }
    // Any other error types will be treated as an internal server error
    return {
        code: HttpStatusCodes.INTERNAL_SERVER_ERROR,
        message: HttpStatusCodes.getStatusText(HttpStatusCodes.INTERNAL_SERVER_ERROR),
        details: err.message || '',
    };
}