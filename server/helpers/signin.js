import Joi from 'joi';

const validateUserSignin = {

  validation(newUser) {
    const newUserSchema = {
      email: Joi.string().email().trim().required(),
      password: Joi.string().trim()
        .required(),
    };
    return Joi.validate(newUser, newUserSchema);
  },
};

export default validateUserSignin;
