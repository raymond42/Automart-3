import Joi from 'joi';

const validateUpdateStatus = {

  validation(newStatus) {
    const newStatusSchema = {
      status: Joi.string().valid('sold', 'available').required(),
    };
    return Joi.validate(newStatus, newStatusSchema);
  },

};

export default validateUpdateStatus;
