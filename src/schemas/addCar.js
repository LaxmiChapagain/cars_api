import joi from 'joi';
const schema = joi.object({
    manufacturerId: joi.number().integer().required(),
    model: joi.string().max(20).required(),
    horsepower: joi.number().integer().min(1000),
    images: joi.array().items(joi.string())
});

export default schema;