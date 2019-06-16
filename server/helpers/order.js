import Joi from 'joi';

const validateOrder = {

  validation(newOrder) {
    const newOrderSchema = {
      car_id: Joi.number().required(),
      amount: Joi.number().required(),
    };
    return Joi.validate(newOrder, newOrderSchema);
  },

};

export default validateOrder;
