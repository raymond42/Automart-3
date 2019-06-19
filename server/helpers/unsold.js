import Joi from 'joi';

const validateUnsold = {

  validation(range) {
    const newPriceSchema = {
      status: Joi.string().valid('unsold', 'sold').required(),
    };
    return Joi.validate(range, newPriceSchema);
  },

};

export default validateUnsold;
