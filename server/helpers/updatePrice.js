import Joi from 'joi';

const validateUpdatePrice = {

  validation(newPrice) {
    const newPriceSchema = {
      price_offered: Joi.number().required(),
    };
    return Joi.validate(newPrice, newPriceSchema);
  },

};

export default validateUpdatePrice;
