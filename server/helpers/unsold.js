import Joi from 'joi';

const validateUnsold = {

  validation(range) {
    const newPriceSchema = {
      status: Joi.string().valid('available').required(),
    };
    return Joi.validate(range, newPriceSchema);
  },

};

export default validateUnsold;
