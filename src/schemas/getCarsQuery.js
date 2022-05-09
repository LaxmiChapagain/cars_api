import joi from 'joi';
const schema = joi.object({
    manufacturerId: joi.number().integer(),
    model: joi.string().max(20),
});

export default schema;