import Joi from 'joi';

const validateAd = {

  validation(newAd) {
    const newAdSchema = {
      // owner: Joi.number().required(),
      // email: Joi.string().email().required(),
      manufacturer: Joi.string().required(),
      model: Joi.string().required(),
      price: Joi.number().required(),
      state: Joi.string().valid('new', 'used').required(),
      status: Joi.string().valid('available', 'sold').required(),
      body_type: Joi.string(),
    };
    return Joi.validate(newAd, newAdSchema);
  },

};

export default validateAd;
