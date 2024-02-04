const Joi = require("joi");

const create = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    latitude: Joi.string().required(),
    longitude: Joi.string().required(),
  }),
};

const update = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    latitude: Joi.string().required(),
    longitude: Joi.string().required(),
  }),
};


module.exports = {
  create,
  update,
};
