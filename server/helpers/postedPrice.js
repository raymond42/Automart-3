import Joi from 'joi';

const validatePostedPrice = {

  validation(newPrice) {
    const newPriceSchema = {
      price: Joi.number().required(),
    };
    return Joi.validate(newPrice, newPriceSchema);
  },

};

export default validatePostedPrice;
