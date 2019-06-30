import Joi from 'joi';

const validateFlag = {

  validation(newFlag) {
    const newFlagSchema = {
      car_id: Joi.number().required(),
      reason: Joi.string().required(),
      description: Joi.string().required(),
    };
    return Joi.validate(newFlag, newFlagSchema);
  },

};

export default validateFlag;
