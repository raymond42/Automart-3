import Joi from 'joi';

const validateAd = {

  validation(newAd) {
    const newAdSchema = {
      manufacturer: Joi.string().required(),
      model: Joi.string().required(),
      price: Joi.number().required(),
      state: Joi.string().valid('new', 'used').required(),
      body_type: Joi.string(),
    };
    return Joi.validate(newAd, newAdSchema);
  },

};

export default validateAd;
