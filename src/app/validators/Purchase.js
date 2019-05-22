const Joi = require('joi');

module.exports = {
  body: {
    id: Joi.string().required(),
    content: Joi.string().required(),
  },
};
